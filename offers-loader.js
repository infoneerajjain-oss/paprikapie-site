/* ===========================================================
   PaprikaPie — offers loader
   Renders offers.json. Offers past validTill disappear on
   their own, no code change needed.

   Offers page:  <div class="offers" id="pp-offers"></div>
   =========================================================== */
(function () {
  var PHONE = "919896333158";
  var box = document.getElementById("pp-offers");
  if (!box) return;

  function isLive(o) {
    if (o.active === false) return false;
    if (!o.validTill) return true;
    var end = new Date(o.validTill + "T23:59:59");
    return isNaN(end) ? true : end >= new Date();
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function waLink(o) {
    var msg = o.whatsapp || "Hi PaprikaPie, I'd like to order the " + o.title + ".";
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg);
  }

  function card(o) {
    var items = (o.items || []).length
      ? "<ul>" + o.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"
      : "";
    return (
      '<article class="offer">' +
        '<div class="ph">' +
          (o.image ? '<img src="' + esc(o.image) + '" alt="' + esc(o.title) +
                     '" loading="lazy" width="640" height="400" onerror="this.remove()">' : "") +
        "</div>" +
        '<div class="bd">' +
          "<h3>" + esc(o.title) + "</h3>" +
          "<p>" + esc(o.description) + "</p>" +
          items +
          (o.terms ? '<div class="terms">' + esc(o.terms) + "</div>" : "") +
          (o.validTill ? '<div class="valid">Valid till ' + esc(o.validTill) + "</div>" : "") +
          '<div class="cta"><a class="btn btn-wa" href="' + waLink(o) + '" rel="noopener">Order this on WhatsApp</a></div>' +
        "</div>" +
      "</article>"
    );
  }

  fetch("offers.json", { cache: "no-cache" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var live = (data.offers || []).filter(isLive);
      box.innerHTML = live.length
        ? live.map(card).join("")
        : '<div class="offer-empty">No offer running right now. WhatsApp us on 9896333158 — we usually have something on.</div>';
    })
    .catch(function () {
      box.innerHTML =
        '<div class="offer-empty">Offers could not load. Call or WhatsApp 9896333158 for today\'s deals.</div>';
    });
})();
