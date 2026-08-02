/* ===========================================================
   PaprikaPie — cart, order tray, WhatsApp handoff
   =========================================================== */
(function () {
  var WA = "919896333158";
  var KEY = "pp_cart_v1";
  var MIN_ORDER = 149;

  /* ---- storage with graceful fallback ---- */
  var memory = null;
  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return memory || [];
    }
  }
  function save(items) {
    memory = items;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {}
  }

  var cart = load();

  function count() {
    return cart.reduce(function (n, i) { return n + i.q; }, 0);
  }
  function total() {
    return cart.reduce(function (n, i) { return n + i.p * i.q; }, 0);
  }
  function keyOf(name, size) {
    return name + "|" + (size || "");
  }

  function addItem(name, price, size) {
    var k = keyOf(name, size);
    var found = null;
    for (var i = 0; i < cart.length; i++) {
      if (keyOf(cart[i].n, cart[i].s) === k) { found = cart[i]; break; }
    }
    if (found) { found.q += 1; }
    else { cart.push({ n: name, p: Number(price), s: size || "", q: 1 }); }
    save(cart);
    render();
  }
  function bump(idx, delta) {
    cart[idx].q += delta;
    if (cart[idx].q <= 0) cart.splice(idx, 1);
    save(cart);
    render();
  }

  /* ---- elements ---- */
  var tray, sheet, scrim, listEl, totEl;

  function build() {
    tray = document.createElement("div");
    tray.className = "tray";
    tray.innerHTML =
      '<div class="top">' +
        '<div class="sum"><div class="a" id="pp-tray-a">Your order</div><div class="b" id="pp-tray-b">₹0</div></div>' +
        '<button class="view" type="button" id="pp-view">View</button>' +
        '<button class="btn btn-wa btn-sm" type="button" id="pp-send">Send on WhatsApp</button>' +
      "</div>";
    document.body.appendChild(tray);

    scrim = document.createElement("div");
    scrim.className = "scrim";
    document.body.appendChild(scrim);

    sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "Your order");
    sheet.innerHTML =
      '<div class="sh"><h2>Your order</h2><button class="x" type="button" id="pp-close" aria-label="Close">&times;</button></div>' +
      '<div class="sb">' +
        '<div id="pp-list"></div>' +
        '<div class="tot"><span>Estimated total</span><span class="v" id="pp-total">₹0</span></div>' +
        '<p class="note">Packing and delivery charges are added when we confirm. Minimum order ₹' + MIN_ORDER + ' for delivery.</p>' +
        '<label class="fld" for="pp-name">Your name</label>' +
        '<input type="text" id="pp-name" autocomplete="name" placeholder="e.g. Neeraj">' +
        '<label class="fld" for="pp-addr">Delivery address</label>' +
        '<textarea id="pp-addr" autocomplete="street-address" placeholder="House / street / landmark, Safidon"></textarea>' +
        '<label class="fld" for="pp-mode">How would you like it?</label>' +
        '<select id="pp-mode"><option>Home delivery</option><option>Takeaway</option><option>Dine-in</option></select>' +
        '<label class="fld" for="pp-pay">Payment</label>' +
        '<select id="pp-pay"><option>Cash on delivery</option><option>UPI / PhonePe / GPay</option><option>Card at counter</option></select>' +
        '<div style="margin-top:18px"><button class="btn btn-wa" type="button" id="pp-send2" style="width:100%">Send order on WhatsApp</button></div>' +
      "</div>";
    document.body.appendChild(sheet);

    listEl = sheet.querySelector("#pp-list");
    totEl = sheet.querySelector("#pp-total");

    document.getElementById("pp-view").onclick = open;
    document.getElementById("pp-close").onclick = close;
    scrim.onclick = close;
    document.getElementById("pp-send").onclick = open;
    document.getElementById("pp-send2").onclick = send;

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  function open() {
    scrim.classList.add("on");
    sheet.classList.add("on");
    renderList();
  }
  function close() {
    scrim.classList.remove("on");
    sheet.classList.remove("on");
  }

  function renderList() {
    if (!cart.length) {
      listEl.innerHTML = '<div class="empty">Nothing added yet.<br>Browse the menu and tap Add.</div>';
      return;
    }
    var html = "";
    for (var i = 0; i < cart.length; i++) {
      var it = cart[i];
      html +=
        '<div class="li">' +
          '<div class="n">' + esc(it.n) + (it.s ? "<small>" + esc(it.s) + "</small>" : "") + "</div>" +
          '<div class="qty">' +
            '<button type="button" data-d="-1" data-i="' + i + '" aria-label="Remove one">&minus;</button>' +
            "<span>" + it.q + "</span>" +
            '<button type="button" data-d="1" data-i="' + i + '" aria-label="Add one">+</button>' +
          "</div>" +
          '<div class="p">₹' + it.p * it.q + "</div>" +
        "</div>";
    }
    listEl.innerHTML = html;
    var btns = listEl.querySelectorAll("button[data-i]");
    for (var b = 0; b < btns.length; b++) {
      btns[b].onclick = function () {
        bump(Number(this.getAttribute("data-i")), Number(this.getAttribute("data-d")));
        renderList();
      };
    }
  }

  function render() {
    var c = count();
    if (!tray) return;
    tray.classList.toggle("up", c > 0);
    document.documentElement.style.setProperty("--tray-h", c > 0 ? "70px" : "0px");
    document.getElementById("pp-tray-a").textContent =
      c === 1 ? "1 item" : c + " items";
    document.getElementById("pp-tray-b").textContent = "₹" + total();
    if (totEl) totEl.textContent = "₹" + total();

    var badges = document.querySelectorAll("[data-cart-count]");
    for (var i = 0; i < badges.length; i++) {
      badges[i].textContent = c;
      badges[i].hidden = c === 0;
    }
  }

  function send() {
    var name = (document.getElementById("pp-name").value || "").trim();
    var addr = (document.getElementById("pp-addr").value || "").trim();
    var mode = document.getElementById("pp-mode").value;
    var pay = document.getElementById("pp-pay").value;

    var lines = ["Hi PaprikaPie, I'd like to order:", ""];
    if (!cart.length) {
      lines = ["Hi PaprikaPie, I'd like to place an order."];
    } else {
      for (var i = 0; i < cart.length; i++) {
        var it = cart[i];
        lines.push(it.q + " x " + it.n + (it.s ? " (" + it.s + ")" : "") + " — ₹" + it.p * it.q);
      }
      lines.push("");
      lines.push("Estimated total: ₹" + total());
      lines.push("");
      lines.push(mode);
      if (name) lines.push("Name: " + name);
      if (addr) lines.push("Address: " + addr);
      lines.push("Payment: " + pay);
    }
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- wire up add buttons ---- */
  function wire() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-add]");
      if (!b) return;
      addItem(b.getAttribute("data-add"), b.getAttribute("data-price"), b.getAttribute("data-size"));
      var was = b.textContent;
      b.classList.add("done");
      if (!b.classList.contains("size")) b.textContent = "Added";
      setTimeout(function () {
        b.classList.remove("done");
        if (!b.classList.contains("size")) b.textContent = was;
      }, 900);
    });

    var mb = document.querySelector(".menu-btn");
    var dr = document.querySelector(".drawer");
    if (mb && dr) {
      mb.onclick = function () {
        var o = dr.classList.toggle("open");
        mb.setAttribute("aria-expanded", o ? "true" : "false");
      };
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  function init() {
    build();
    wire();
    render();
  }
})();
