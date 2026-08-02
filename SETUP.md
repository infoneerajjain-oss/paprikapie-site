# PaprikaPie Kitchen Desk — setup

Four files. Roughly 20 minutes, mostly waiting for the deploy.

---

## What you get

| File | Where it goes | What it does |
|---|---|---|
| `paprikapie-admin.html` | `admin/index.html` in your repo | The panel you use. Reads posters, writes posts, writes WhatsApp replies, reads traffic. |
| `offers.json` | repo root | The one file that decides what offers show on the site. |
| `offers-loader.js` | repo root | Puts `offers.json` on the page. Hides offers past their end date automatically. |
| `claude-function.js` | `netlify/functions/claude.js` **or** `api/claude.js` | Runs the AI with your key hidden on the server. |

---

## Step 1 — Get an Anthropic API key

1. Sign up at console.anthropic.com
2. Add ₹800–2000 of credit — that is months of use at your volume
3. Create an API key and copy it

## Step 2 — Add the key to your host

**Netlify:** Site settings → Environment variables
**Vercel:** Project settings → Environment variables

Add two:

```
ANTHROPIC_API_KEY = sk-ant-...
ADMIN_TOKEN       = any password you invent
```

The `ADMIN_TOKEN` stops strangers finding `/admin` and spending your credit.

**Never commit the key to GitHub.** If it ever leaks, delete it in the console and make a new one.

## Step 3 — Drop in the files

```
paprikapie/
├─ index.html
├─ offers.html
├─ offers.json            ← new
├─ offers-loader.js       ← new
├─ admin/
│  └─ index.html          ← paprikapie-admin.html, renamed
└─ netlify/functions/
   └─ claude.js           ← claude-function.js, renamed
```

Vercel users: put it at `api/claude.js` instead of the netlify folder.

## Step 4 — Point the admin panel at your function

Open `admin/index.html` and find line ~1 of the script block:

```js
const API_ENDPOINT = "https://api.anthropic.com/v1/messages";
```

Change it to:

```js
const API_ENDPOINT = "/.netlify/functions/claude";   // Netlify
// const API_ENDPOINT = "/api/claude";               // Vercel
```

Then find the `ask()` function and add your token to the headers:

```js
headers: {
  "Content-Type": "application/json",
  "x-admin-token": "the password you set as ADMIN_TOKEN"
}
```

## Step 5 — Wire the offers into your site

In `offers.html`, replace the two hard-coded offer blocks with:

```html
<div id="pp-offers"></div>
```

In `index.html`, replace the "Enjoy 20% off" box with:

```html
<div id="pp-offer-banner"></div>
```

Before `</body>` on both pages:

```html
<script src="offers-loader.js" defer></script>
```

Add styling for `.pp-offer`, `.pp-offer-cta` and `.pp-banner` in your existing CSS — copy whatever your current offer cards use.

## Step 6 — Push

```bash
git add .
git commit -m "Add admin panel and dynamic offers"
git push
```

Netlify/Vercel rebuilds in about a minute.

---

## How you'll actually use it

**New poster printed for the shop?**
Open `paprikapie.co.in/admin` on your phone → photograph the poster → check the ticket → Save → Copy offers.json → paste into GitHub's web editor → commit. Live in 60 seconds.

**Offer finished?**
Nothing to do. Once the end date passes it stops showing.

**Posting on Instagram?**
Posts tab → pick the dish → copy → paste.

**Setting up WhatsApp?**
WhatsApp tab → generate once → paste into WhatsApp Business → Settings → Business tools. Do this once and it runs itself.

---

## What this does *not* do

**It does not send WhatsApp messages by itself.** Automatic replies come from the free WhatsApp Business app's greeting message, away message and quick replies — this writes them, you paste them in once. Truly automated conversations need the paid WhatsApp Business API through a provider like Twilio or Interakt (roughly ₹1,500–3,000/month). Only worth it past about 40–50 orders a day.

**It does not push to GitHub for you.** You copy the JSON and paste it. Adding auto-commit means putting a GitHub token in the browser, which is not worth the risk for a two-minute manual step.

**It does not count visitors on its own.** Cloudflare Web Analytics does the counting — free, no cookie banner. The panel gives you the snippet and then reads the numbers back to you in plain language.

---

## Costs

| | |
|---|---|
| Anthropic API | ₹2–5 per poster read, less for posts. Realistically under ₹300/month. |
| Cloudflare Analytics | Free |
| Netlify/Vercel | Free at your traffic |
| WhatsApp Business app | Free |

## Security checklist

- [ ] API key only in the host's environment variables, never in the repo
- [ ] `ADMIN_TOKEN` set and added to the admin page headers
- [ ] `admin/` not linked from anywhere on the public site
- [ ] Spend limit set in the Anthropic console
