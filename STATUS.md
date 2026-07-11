# STATUS — Annika Tara Website

_Last updated: 2026-07-11 (session 2)_

## Current state

**v2 redesign complete** — more open, clean and inviting, same voice and
witchy-botanical aesthetic. Verified in Claude Preview (desktop 1440px +
mobile 375px, console clean, no failed requests).

### What changed in v2
- **All artwork regenerated** with Nano Banana Pro (`gemini-3-pro-image`):
  wider/more-open hero mountain panorama, soft `mountains-band.jpg` horizon
  behind the booking section, brand-new succulents
  (`succulent-left.png`, `succulent-right.png`, `sprig.png`).
  Old `plant-left/right.png` deleted.
- **More air**: lighter paper grain, larger section padding, ticker unboxed
  (soft side-fade mask), gentler shadows/rotations.
- **Booking funnel**: floating "☾ Book a free call" pill (appears after hero,
  hides at booking section), "The kettle's on — book a free call →" link in
  About, booking section framed by the wide mountain horizon.
- **Motion**: hero succulents grow in from roots then sway (`.grow`/`sway`),
  about-sprig grows in on scroll (`.grow-reveal`), mouse-parallax on
  mountains/plants, cursor-following warm glow in hero, soft 3D card tilt,
  gold dust motes. All respect `prefers-reduced-motion`.
- Copy lightly tightened, original tone/words kept.

## Placeholders still open (client input needed)
- TidyCal path `annikatara/discovery-call` in `#book` (embed shows TidyCal
  404 until the real account/path exists) + two fallback links
- Prices €222 / €333, testimonials, `hello@annikatara.com`, Instagram URL,
  Imprint/Privacy pages
- Stripe: later — point offering-card buttons at Stripe Payment Links
  (see site/README.md)

## Preview quirks (this machine)
- Claude Preview can't read ~/Documents (TCC) — `.claude/launch.json` serves
  a mirror in the session scratchpad; **rsync `site/` there after edits** and
  update the path in launch.json each new session.
- Hidden preview tab only paints from document top AND pauses rAF/IO —
  to inspect lower sections hide the ones above; take a screenshot to force
  a frame before reading scroll/IO-dependent state.
