# PaprikaPie — site fixes

Work top to bottom. Section 1 takes ten minutes and is the highest value.

---

## 1. Find and replace (do this first)

Open your repo, search across all `.html` files:

| Find | Replace with | Why |
|---|---|---|
| `Panner` | `Paneer` | Wrong spelling on your priciest items, and nobody searches "panner pizza" |
| `panner` | `paneer` | Same, lowercase |
| `★ 4.7 real reviews soon` | *(delete the whole line)* | Reads as a fake rating on a site that otherwise brags about being honest |
| `Map placeholder — drop in a Google Maps embed for` | *(delete the whole block)* | Developer note left live on About |
| `India's Favourite` | `Safidon's Favourite` | Overclaim; hurts trust and gains nothing |

Then check `offers.html`: it lists **Chicken Sausage** and **Peri Peri Chicken** in the 6 Pizza Combo, but every other item on your site is vegetarian. Decide which is true and fix it — right now a pure-veg customer will not order.

Also fix the price contradiction: homepage says Aloo Vada Pav is ₹49, the offers page sells it "20% off" at ₹50.

---

## 2. Opening hours

Nowhere on your site says when you're open. It's the most-asked question you get.

Add to the footer of **every** page, inside the "Restaurant" column:

```html
<li><strong>Open:</strong> 11:00 AM – 11:00 PM, all days</li>
```

*(Change the times to your real ones.)*

---

## 3. Restaurant schema — makes Google show your hours, rating and phone

Paste inside `<head>` on **`index.html` only**.

**Before pasting:** open Google Maps, find your shop, right-click the exact spot → the coordinates appear at the top. Replace the latitude/longitude below.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "PaprikaPie",
  "image": "https://paprikapie.co.in/images/hero-pizza.jpg",
  "@id": "https://paprikapie.co.in/#restaurant",
  "url": "https://paprikapie.co.in/",
  "telephone": "+919896333158",
  "email": "info.paprikapie@gmail.com",
  "priceRange": "₹₹",
  "servesCuisine": ["Pizza", "Italian", "South Indian", "Fast Food", "Chinese"],
  "menu": "https://paprikapie.co.in/menu-pizza.html",
  "acceptsReservations": "False",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "M.G. Road, Opp. Stadium Market",
    "addressLocality": "Safidon",
    "addressRegion": "Haryana",
    "postalCode": "126112",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.4056,
    "longitude": 76.6706
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "11:00",
    "closes": "23:00"
  }],
  "hasDeliveryMethod": ["http://purl.org/goodrelations/v1#DeliveryModePickUp"],
  "potentialAction": {
    "@type": "OrderAction",
    "target": "https://wa.me/919896333158"
  },
  "sameAs": []
}
</script>
```

Put your Instagram and Facebook URLs inside `sameAs` — it links your profiles to your listing.

Test it afterwards at **search.google.com/test/rich-results**.

---

## 4. Share preview — critical, since you push WhatsApp

Right now when anyone shares `paprikapie.co.in` on WhatsApp, they get a blank grey box. With this they get a cheese-pull photo. Paste into `<head>` on every page, changing the title, description and URL per page.

```html
<meta property="og:type" content="restaurant">
<meta property="og:site_name" content="PaprikaPie, Safidon">
<meta property="og:title" content="PaprikaPie — Pizza, Pasta & South Indian in Safidon">
<meta property="og:description" content="Fresh dough, fresh chutneys, made to order. Dine-in, takeaway & home delivery. Call or WhatsApp 9896333158.">
<meta property="og:image" content="https://paprikapie.co.in/images/share-card.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://paprikapie.co.in/">
<meta property="og:locale" content="en_IN">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="PaprikaPie — Pizza, Pasta & South Indian in Safidon">
<meta name="twitter:description" content="Fresh dough, fresh chutneys, made to order. WhatsApp 9896333158.">
<meta name="twitter:image" content="https://paprikapie.co.in/images/share-card.jpg">

<link rel="canonical" href="https://paprikapie.co.in/">
```

You need one image at `images/share-card.jpg`, exactly **1200 × 630 px** — your best pizza photo with the logo in a corner.

Check it after deploying at **developers.facebook.com/tools/debug**.

---

## 5. Delivery information bar

People won't order without knowing this. Add above the footer on every page:

```html
<div class="pp-delivery-bar">
  <span><strong>Delivery:</strong> Safidon town + 5 km</span>
  <span><strong>Minimum order:</strong> ₹149</span>
  <span><strong>Delivery charge:</strong> ₹20 · free above ₹299</span>
  <span><strong>Usual time:</strong> 30–40 min</span>
  <span><strong>Packing:</strong> ₹10 per box</span>
</div>
```

```css
.pp-delivery-bar{
  display:flex;flex-wrap:wrap;gap:8px 22px;justify-content:center;
  padding:16px 18px;background:#FDF6E7;border-top:1px solid #E4D9C7;
  font-size:14px;color:#4A3A32;
}
.pp-delivery-bar strong{color:#221611}
```

Fill in your real numbers. Even if delivery is free everywhere, say so — silence loses orders.

---

## 6. Veg / non-veg markers

Standard in India and expected. Add the CSS once:

```css
.veg,.nonveg{
  display:inline-block;width:14px;height:14px;
  border:1.5px solid currentColor;border-radius:2px;
  position:relative;vertical-align:middle;margin-right:6px;
}
.veg{color:#2F6B4F}
.nonveg{color:#B32218}
.veg::after,.nonveg::after{
  content:"";position:absolute;inset:0;margin:auto;
  width:6px;height:6px;background:currentColor;border-radius:50%;
}
```

Then before every item name:

```html
<span class="veg" role="img" aria-label="Vegetarian"></span> Paneer Overloaded
```

---

## 7. Map embed for the About page

Replace the placeholder text with this. Get your exact `!1m18...` string by opening your shop on Google Maps → Share → Embed a map → copy the `src`.

```html
<iframe
  src="https://www.google.com/maps?q=PaprikaPie,+M.G.+Road,+Safidon,+Haryana+126112&output=embed"
  width="100%" height="320" style="border:0;border-radius:12px"
  allowfullscreen="" loading="lazy" title="PaprikaPie location in Safidon"
  referrerpolicy="no-referrer-when-downgrade"></iframe>
```

---

## 8. FSSAI licence

Food businesses are expected to display this. Add to the footer:

```html
<p class="pp-fssai">FSSAI Lic. No. 00000000000000</p>
```

Use your real 14-digit number from your certificate.

---

## 9. Two small files for the repo root

Save both alongside `index.html`.

`robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://paprikapie.co.in/sitemap.xml
```

`sitemap.xml` — see the separate file in this set.

Then submit the sitemap at **search.google.com/search-console**.

---

## 10. Google Business Profile — biggest single win

For "pizza near me" in Safidon, your Google listing matters more than the website. It's free.

1. Go to **business.google.com** → add PaprikaPie
2. Verify (they post a card, takes ~1 week)
3. Add: hours, the same photos, menu link, WhatsApp number, delivery area
4. Post your offer weekly — same poster you already print
5. Ask every dine-in customer to leave a review

That last one also solves the fake-rating problem honestly: once you have 20+ real reviews, you can put the genuine number back on the site.

---

## Order to do it in

| Priority | Task | Time |
|---|---|---|
| 1 | Section 1 — find and replace | 10 min |
| 2 | Section 10 — Google Business Profile | 20 min |
| 3 | Sections 2, 5 — hours and delivery info | 15 min |
| 4 | Section 4 — share preview | 30 min (needs the image) |
| 5 | Section 3 — schema | 10 min |
| 6 | Sections 6, 7, 8, 9 | 30 min |
