# STACKED. — Burgers, Built Differently

A cinematic, scroll-driven marketing + ordering site for **STACKED.**, a 100%-vegetarian burger brand.
The centerpiece is a 308-frame burger "film" that builds the burger as you scroll — bun, crisp, juicy,
melted, stacked — rendered on canvas with copy beats synced to scroll progress.

Live: **https://arshadkhan001-zip.github.io/scroll-animation/**

## Features

- **Scroll-driven hero film** — 308 WebP frames scrubbed via GSAP ScrollTrigger + Lenis smooth scroll,
  with progressive loading, an LRU decode cache, cover-fit canvas rendering, and a reduced-motion fallback.
- **Signature menu** — alternating editorial layout with prices, tags, and add-to-cart.
- **Product story** — annotated "Signature / 001" feature section (data-driven, add more with one object).
- **Order section** — tabbed menu (burgers / sides / drinks / combos / desserts) with quantity steppers.
- **Cart drawer** — global cart store, subtotals, slide-over drawer.
- **Combo spotlight, brand story, locations, footer** — full landing-page composition.
- **Motion system** — one-shot scroll reveals throughout; accessible (skip link, ARIA, focus states).

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · GSAP (ScrollTrigger) · Lenis · lucide-react

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build (outputs dist/)
npm run preview  # preview the production build
```

## Frame pipeline

The hero film ships as generated WebP copies in `public/frames/` (tracked in git).
The original PNG sources live in `frames/` (git-ignored, ~350 MB) and are never modified:

```bash
python scripts/convert-frames.py              # PNG -> public/frames/*.webp (q70)
python scripts/convert-frames.py --check-only # verify sources only
```

Frame loading/rendering logic: `src/lib/frames.ts`. Scroll + animation setup: `src/lib/scroll.ts`.

## Project structure

```
src/
  components/   # Hero, Navbar, SignatureMenu, ProductStory, OrderSection,
                # Combo, BrandStory, Locations, Footer, CartDrawer, ...
  data/         # menu.ts (products), stories.ts (feature stories)
  lib/          # frames.ts (film engine), scroll.ts (GSAP+Lenis), motion.ts
  store/        # cart.tsx (global cart)
  styles/       # design tokens, base, typography, layout, components, motion
public/frames/  # 308 runtime WebP frames
scripts/        # convert-frames.py
```

## Deployment

Pushes to `main` auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages.
`vite.config.ts` sets `base: '/scroll-animation/'` and all frame URLs resolve through
`import.meta.env.BASE_URL`, so the site works under the `/scroll-animation/` project subpath.
