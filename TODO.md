# Before you go live — 5 things only you can fill in

I built the site with real menu prices from your current site. These five
placeholders need your actual details. Search for the text in the left column.

| Search for | Where | Put in |
|---|---|---|
| `11:00 AM – 11:00 PM` | `assets/../*.html` + `build` | Your real opening hours |
| `00000000000000` | footer + about page | Your 14-digit FSSAI licence number |
| `Min order: ₹149` / `₹20 · free above ₹299` / `₹10 per box` | delivery strip | Your real delivery terms |
| `29.4056, 76.6706` | schema in `index.html` | Exact coordinates — right-click your shop on Google Maps |
| `"sameAs": []` | schema in `index.html` | Your Instagram and Facebook URLs |

Fastest way: open each `.html` file, use Find & Replace, done in 10 minutes.

---

# Photos to add (images/ folder)

The site works without any of these — it shows a warm gradient instead of a
broken image. But real photos will do more for orders than anything else here.

**Priority order:**

| Filename | What | Size |
|---|---|---|
| `share-card.jpg` | Best pizza photo + logo. Shows when anyone shares your link on WhatsApp. | 1200 × 630 |
| `hero.jpg` | Wide shot of your food or your shop front. Sits behind the homepage headline. | 1600 × 900 |
| `masala-dosa.jpg` | | 800 × 600 |
| `vada-pav.jpg` | | 800 × 600 |
| `paneer-overloaded.jpg` | | 800 × 600 |
| `white-sauce-pasta.jpg` | | 800 × 600 |
| `paneer-dosa.jpg` | | 800 × 600 |
| `paneer-momos.jpg` | | 800 × 600 |
| `malai-chaap.jpg` | | 800 × 600 |
| `oreo-shake.jpg` | | 800 × 600 |
| `pizza-onion.jpg` `pizza-tomato.jpg` `pizza-capsicum.jpg` `pizza-cheesy.jpg` `pizza-corn.jpg` `pizza-soya.jpg` | Topping pizzas | 800 × 600 |
| `offer-combo.jpg` `offer-vadapav.jpg` | Your offer posters | 640 × 400 |
| `favicon.png` | Your logo, square | 180 × 180 |

**How to shoot them on a phone, in one evening:**

1. Daylight only. Sit near a window, turn the tube light off.
2. Plain background — a wooden table or a plain cloth.
3. Shoot from 45° above, not straight down.
4. Get close. Fill the frame with the food.
5. Steam matters. Shoot within a minute of it leaving the kitchen.
6. One photo per dish is enough. Don't over-edit.

---

# What changed from your old site

**Fixed**
- `Panner` → `Paneer` everywhere (also `Mashroom` → `Mushroom`, `Spicale` → `Special`)
- Removed every "★ 4.7 real reviews soon" — that was a rating with nothing behind it
- Removed the "Map placeholder" developer note; real Google Maps embed on Visit Us
- "India's Favourite" → "Safidon's own", which is true and better for local search
- 6 Pizza Combo no longer lists chicken — your kitchen is pure veg
- Vada Pav offer price no longer contradicts the menu price

**Added**
- Opening hours in the footer, ticker and schema
- Delivery strip on every page: area, minimum, charge, time, packing
- Green veg mark on all 161 items
- Restaurant schema, Open Graph and Twitter cards on every page
- FSSAI line in the footer
- Cart now survives moving between pages
- Pizza size picker — you can add Medium or Large, not just Regular
- Order sheet collects name, address, dine-in/takeaway and payment before WhatsApp
- Cart badge hides itself when empty
- Sticky order tray at the bottom once you add something
- Category chips at the top of every menu page
- Skip link, focus rings, reduced-motion support

**Removed**
- Stock pizza photo with what looked like pepperoni on a pure-veg site
- The abstract plate illustration in the hero
