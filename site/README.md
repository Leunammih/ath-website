# Annika Tara — Website

Static single-page site: `index.html` + `styles.css` + `site.js` + `assets/`.
No build step — upload the `site/` folder contents to any static host
(Hostinger, Netlify, etc.) or open `index.html` directly.

## Connect TidyCal (booking)

The booking section (`#book`) contains:

```html
<div class="tidycal-embed" data-path="annikatara/discovery-call"></div>
```

Replace `annikatara/discovery-call` with the real booking path from the
TidyCal dashboard (Booking type → Embed). Also update the two fallback links
pointing to `https://tidycal.com/annikatara` (booking section + footer noscript).

## Stripe (later)

Payments are currently handled inside TidyCal if configured there.
For standalone Stripe: create Payment Links in the Stripe dashboard and point
each offering card's button (`.btn--card` in `#offerings`) at its link —
no code changes needed beyond the `href`s. The "coming soon" note is in
`.offerings__note` and `.booking__stripe`.

## Images

All artwork in `assets/` was generated with Nano Banana Pro
(`gemini-3-pro-image`) in the blush / terracotta / sage palette, then
white-stripped to transparency. Portrait is from
`../Website AT reference elements/Annika Portrait.HEIC`.

Key pieces: `hero-mountains.jpg` (wide open panorama), `mountains-band.jpg`
(soft horizon behind the booking section), `succulent-left.png` /
`succulent-right.png` (hero plants that grow in), `sprig.png` (about section).

## Placeholders to review

- Prices (€222 / €333) and offering copy in `#offerings`
- Testimonials in `#kind-words`
- `hello@annikatara.com`, Instagram link, Imprint & Privacy links in the footer
