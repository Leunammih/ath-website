# Annika Tara — Website

Static single-page site: `index.html` + `styles.css` + `site.js` + `assets/`.
No build step — upload the `site/` folder contents to any static host
(Netlify, Hostinger, etc.) or open `index.html` directly.

Relational Life Coaching. Voice and content follow **annikatara.com**.

## Pages

Multi-page, shared nav/footer:
`index.html` (landing) · `my-approach.html` · `bio.html` · `individual.html` ·
`couples.html` · `free-consultation.html`. All share `styles.css` + `site.js`
and live in this folder, so relative `assets/` links work everywhere.

## Contact form

The `#contact` form on the landing posts to **Web3Forms** (works on static
hosting, no backend). To receive messages: create a free access key at
web3forms.com and replace `YOUR_ACCESS_KEY_HERE` in `index.html`. Until then it
runs in a friendly preview mode (no email sent). The submit handler and messages
live in `site.js`.

## Booking — the mock vs. real TidyCal

The `#book` section currently shows a **styled mock** of the TidyCal booking
widget (`.tidycal-mock`) so the experience is visible before the account
exists. It is a preview only — it does not book anything.

To go live with TidyCal:

1. In `index.html` `#book`, delete the whole `<div class="tidycal-mock">…</div>`.
2. Uncomment the real embed right below it:
   ```html
   <div class="tidycal-embed" data-path="annikatara/free-consultation"></div>
   ```
3. Replace `annikatara/free-consultation` with the real booking path from the
   TidyCal dashboard (Booking type → Embed). The TidyCal `embed.js` script is
   already included at the bottom of `index.html`.

## Stripe (later)

Payments can be handled inside TidyCal if configured there. For standalone
Stripe: create Payment Links in the Stripe dashboard and point each offering
card's button (`.btn--card` in `#offerings`) at its link — no code changes
beyond the `href`s. The "coming soon" note lives in `.offerings__note` and
`.booking__stripe`.

## Images

- `logo.png`, `annika-portrait.jpg` — client-provided; never regenerate.
- `hero-mountains.jpg`, `mountains-band.jpg` — watercolor mountains generated
  with `gemini-3-pro-image` (blush / terracotta / sage palette).
- `medallion-roots.png`, `medallion-hands.png`, `medallion-moth.png` — Annika's
  DALLE medallions, circular-masked and web-optimized.

To regenerate art (blush #E8B4A0 / terracotta #C05B2E / sage #8FA382 / cream
#FAF3E8 palette, soft watercolor), call `gemini-3-pro-image` REST directly with
the key at `../API Keys/gemini.key` (`x-goog-api-key` header; supports
`aspectRatio` 21:9 and `imageSize` 2K). Mask/optimize PNGs with Pillow.

## Placeholders to fill

- Testimonials in `#words` (3 placeholder cards → real client quotes).
- `hello@annikatara.com`, Instagram URL, Privacy Policy & Terms links (footer).
- Prices ($90 / $150) and offering copy are from annikatara.com — confirm.
