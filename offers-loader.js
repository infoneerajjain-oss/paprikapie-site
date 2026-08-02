/* ============================================================
   PaprikaPie — offers loader
   Reads offers.json and renders it. Offers past validTill
   disappear on their own, no code change needed.

   On offers.html add:   <div id="pp-offers"></div>
   On index.html add:    <div id="pp-offer-banner"></div>
   Then before </body>:  <script src="offers-loader.js" defer></script>
   ============================================================ */
(function () {
  var PHONE = "919896333158";

  function isLive(o) {
    if (o.active === false) return false;
    if (!o.validTill) return true;
    var end = new Date(o.validTill + "T23:59:59");
    return !isNaN(end) && end >= new Date();
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
    return (
      '<article class="pp-offer">' +
        (o.image ? '<img src="' + esc(o.image) + '" alt="' + esc(o.title) + '" loading="lazy" width="600" height="600">' : "") +
        '<div class="pp-offer-body">' +
          "<h3>" + esc(o.title) + "</h3>" +
          "<p>" + esc(o.description) + "</p>" +
          (o.items && o.items.length
            ? '<ul class="pp-offer-items">' + o.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"
            : "") +
          (o.terms ? '<p class="pp-offer-terms">' + esc(o.terms) + "</p>" : "") +
          (o.validTill ? '<p class="pp-offer-valid">Valid till ' + esc(o.validTill) + "</p>" : "") +
          '<a class="pp-offer-cta" href="' + waLink(o) + '" rel="noopener">Order on WhatsApp →</a>' +
        "</div>" +
      "</article>"
    );
  }

  fetch("offers.json", { cache: "no-cache" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var live = (data.offers || []).filter(isLive);
      var list = document.getElementById("pp-offers");

      if (list) {
        list.innerHTML = live.length
          ? live.map(card).join("")
          : '<p class="pp-offer-empty">No offer running right now. WhatsApp us on 9896333158 — we usually have something on.</p>';
      }

      var banner = document.getElementById("pp-offer-banner");
      if (banner && live.length) {
        var o = live[0];
        banner.innerHTML =
          '<div class="pp-banner">' +
            "<h3>" + esc(o.title) + "</h3>" +
            "<p>" + esc(o.description) + "</p>" +
            '<a class="pp-offer-cta" href="' + waLink(o) + '" rel="noopener">Order now →</a>' +
          "</div>";
      } else if (banner) {
        banner.innerHTML = "";
      }
    })
    .catch(function () {
      var list = document.getElementById("pp-offers");
      if (list) {
        list.innerHTML =
          '<p class="pp-offer-empty">Offers couldn\'t load. Call or WhatsApp 9896333158 for today\'s deals.</p>';
      }
    });
})();
