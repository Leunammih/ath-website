# Annika Tara — Relational Life Coaching

Static website for **Annika Tara**. Plain HTML/CSS/JS — no build step.
Voice and content follow annikatara.com.

## Deploy to Hostinger

Everything lives at the repository **root** (`index.html` is the entry point),
so hosting is a straight file copy:

1. In hPanel → **Files → File Manager**, open `public_html`.
2. Upload the repo's root files into `public_html`:
   `index.html`, `my-approach.html`, `bio.html`, `individual.html`,
   `couples.html`, `free-consultation.html`, `styles.css`, `site.js`, and the
   `assets/` folder.
   (Or use Hostinger's **Git deploy** and point it at this repo, root directory.)
3. Visit your domain — `index.html` loads automatically.

That's it. No server, database, or build required.

## Pages

`index.html` (landing) · `my-approach.html` · `bio.html` · `individual.html` ·
`couples.html` · `free-consultation.html`. All share `styles.css` + `site.js`
and use relative `assets/` links.

## Two things to switch on before launch

**1 · Booking (TidyCal).** The booking section shows a styled **mock** of the
TidyCal widget so the experience is visible. To go live, in `index.html` and
`free-consultation.html`:
- delete the `<div class="tidycal-mock">…</div>` block, and
- uncomment the real embed below it:
  `<div class="tidycal-embed" data-path="annikatara/free-consultation"></div>`
- set the real booking path from the TidyCal dashboard (Booking type → Embed).
The TidyCal `embed.js` script is already included.

**2 · Contact form (Web3Forms).** The `#contact` form posts to Web3Forms (works
on static hosting, no backend). Create a free access key at web3forms.com and
replace `YOUR_ACCESS_KEY_HERE` in `index.html`. Until then it runs in a friendly
preview mode.

## Stripe (later)

Create Payment Links in the Stripe dashboard and point each offering card's
button (`.btn--card`) at its link — no code changes beyond the `href`s.

## Images

- `logo.png`, `annika-portrait.jpg` — client-provided.
- `hero-mountains.jpg`, `mountains-band.jpg` — watercolor mountains.
- `medallion-*.png` — circular botanical medallions.
- `icon-cultivate/reflect/witness.png` — approach icons.

Palette: cream `#FAF3E8` · terracotta `#C05B2E` · blush `#E8B4A0` ·
sage `#8FA382` · gold `#C9A227`. Type: Fraunces + Karla (Google Fonts).

## Placeholders to fill

- Testimonials (`#words`), real TidyCal path, Web3Forms key,
  `hello@annikatara.com`, Instagram URL, Privacy Policy & Terms links.
