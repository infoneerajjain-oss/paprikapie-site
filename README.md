# paprikapie-site

Website for PaprikaPie — pizza, pasta and South Indian kitchen in Safidon (Jind), Haryana.

Live at https://paprikapie.co.in

## What is in here

| Path | What it does |
|---|---|
| `offers.json` | The only file that decides which offers show on the site. Updated automatically by the n8n workflow. |
| `offers-loader.js` | Renders `offers.json` on the page and hides offers past their end date. |
| `admin/index.html` | AI admin panel — reads posters, writes social posts and WhatsApp replies. |
| `netlify/functions/claude.js` | Serverless proxy so the Anthropic API key stays off the browser. |
| `sitemap.xml`, `robots.txt` | For Google Search Console. |
| `SETUP.md` | Deploy steps and environment variables. |
| `site-fixes.md` | Outstanding fixes for the site pages. |

## Still to add

The page files (`index.html`, `offers.html`, `about.html`, `menu-*.html`) and the
`images/` folder need to be copied in from wherever the site is currently hosted.

## Environment variables

Set these in Netlify or Vercel, never in this repo:

- `ANTHROPIC_API_KEY`
- `ADMIN_TOKEN`
