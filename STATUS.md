# STATUS — Annika Tara Website

_Last updated: 2026-07-11 (session 4)_

## Session 4 — multi-page expansion

Now a **multi-page** site (shared nav/footer across pages):
- `index.html` (landing), `my-approach.html`, `bio.html`, `individual.html`,
  `couples.html`, `free-consultation.html`.
- **Approach**: landing overview expanded (each pillar = tagline + a sentence,
  her wording), with **new generated botanical icons** (`icon-cultivate/reflect/
  witness.png`) replacing the minimalist SVG glyphs; deep-dive `my-approach.html`
  uses her real Witness/Reflect/Cultivate copy + the "greatest gift" pull-quote.
- **Bio page** from her provided text, **leading with the Master's in Clinical
  Mental Health Counseling**, + a credentials strip. (Her live /bio was offline;
  more detail can be added when it returns.)
- **Session detail pages** (Individual $90/50min, Couples $150/80min) with
  "this might be for you if…" + "how we work". Free-consultation page hosts the
  mock booking widget. Offering cards on the landing link to these pages.
- **Offerings**: "most requested" badge softened to a subtle "popular" pill;
  **Retreats & Workshops broadened** (nature-based immersion, creative
  expression, relational practice, mother–daughter workshops) — no longer only
  sensuality/boundaries.
- **Contact form** added (`#contact`, name/email/message) wired to **Web3Forms**
  with graceful preview mode until an access key is set. Icon botanicals
  generated via `gemini-3-pro-image` and background-stripped.
- Verified: 6 pages render, console clean, mock calendar + contact form work,
  desktop + mobile.

**Action needed to make contact form live:** set a Web3Forms access key —
replace `YOUR_ACCESS_KEY_HERE` in `index.html` `#contact`.

## Current state

**v3 rebuild complete** — realigned to Annika's *real* brand from
**annikatara.com**. The previous "v2" had drifted into an invented whimsical
"witch / gentle mischief / moons / moths" persona with fabricated prices and
testimonials; v3 replaces all of that with her authentic voice and offerings,
keeping the earthy, nature-rooted aesthetic. Verified in Claude Preview
(desktop 1440px + mobile 375px, console clean, no failed requests).

### What changed in v3
- **Authentic copy** from annikatara.com: *"Transform. Empower. Thrive."*,
  *"Allowing your ultimate potential and shaping the life you crave"*, the
  **Cultivate / Reflect / Witness** pillars, *"bridges nature connection,
  embodiment, and relational awareness"*, and **real offerings** — Individual
  Coaching **$90 / 50 min**, Couples & Relational **$150 / 80 min**, Retreats
  & Workshops. Concise, her words/tone, no AI phrasing.
- **US-adapted**: USD prices; footer uses **Privacy Policy + Terms** (no German
  Imprint); location-neutral retreats ("Seasonal gatherings").
- **New mountain art** (regenerated with `gemini-3-pro-image`): open, grounded
  `hero-mountains.jpg` (21:9) + soft `mountains-band.jpg` horizon — no moon.
- **Annika's liked DALLE medallions** integrated (she added them): ROOTS by the
  portrait, HANDS as a soft Approach backdrop, MOTH as a small subtle
  Testimonials accent. Circular-masked + web-optimized (`medallion-*.png`).
- **Mock TidyCal booking widget** in `#book` — a styled preview (host card +
  live-ish month calendar + time slots + confirm) so Annika sees the experience.
  Real embed is commented and ready to swap in (see README).
- **Testimonials** section with clearly-marked placeholder cards for her real
  quotes (no fabrication).
- **Motion** kept subtle: mountain mouse-parallax, cursor glow, gold dust,
  card tilt, pillar-glyph draw-in, floating medallions, reveal-on-scroll,
  floating "Free consultation" pill. All respect `prefers-reduced-motion`.
- Removed off-brand assets: `succulent-left/right.png`, `sprig.png`, `moth.png`,
  `emblem.png`.

## Placeholders still open (client input needed)
- **TidyCal**: mock is live for preview. To go live, in `#book` remove
  `.tidycal-mock`, uncomment the real `.tidycal-embed`, and set the real path
  (currently `annikatara/free-consultation`). See site/README.md.
- **Testimonials**: 3 placeholder cards — swap in real client quotes.
- **Contact**: `hello@annikatara.com`, Instagram URL, Privacy Policy & Terms
  links are placeholders.
- **Stripe**: later — point offering-card buttons at Stripe Payment Links
  (href only). "coming soon" note in `.offerings__note` / `.booking__stripe`.

## Image generation (how the art was made — no MCP)
`claude mcp list` shows no MCP; "Nano Banana" was never an MCP. Art was made by
calling **`gemini-3-pro-image` REST directly** (key at `API Keys/gemini.key`,
`x-goog-api-key` header, supports `aspectRatio` 21:9 + `imageSize` 2K).
Generator script: session scratchpad `gen_image.py`. Portrait & logo are
client-provided — never regenerate.

## Preview quirks (this machine)
- Claude Preview can't read ~/Documents (TCC) — `.claude/launch.json` serves a
  mirror in the session scratchpad. This session's cwd is "Claude Self
  Analysis", so the working `launch.json` lives there too; **rsync `site/` to
  the mirror after edits** and update the scratchpad path each new session.
- Hidden preview tab pauses rAF/IntersectionObserver and only paints from the
  document top — to inspect lower sections, `display:none` the ones above and
  screenshot; force `.reveal{opacity:1}` via eval to see revealed content.
