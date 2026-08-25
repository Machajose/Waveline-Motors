# Waveline Motors — Frontend Scaffold

React + Vite + Tailwind v4, React Router, Framer Motion. Mock data only (no Supabase wired up yet).

## Run it
```
npm install
npm run dev
```

## New in this version — animations
- `src/components/home/Hero.jsx` — rebuilt: sliding "driving" car (SVG placeholder,
  swap for a real transparent PNG/SVG car cutout in `src/assets/hero/`), parallax
  background, staggered text entrance.
- `src/components/ui/Reveal.jsx` — NEW. Reusable scroll-triggered fade/slide wrapper,
  used across Home, VehicleGrid, Evolution.
- `src/components/ui/StatCounter.jsx` — NEW. Animated count-up number.
- `src/components/home/StatsBand.jsx` — NEW. Stats row on Home using StatCounter.
- `src/components/vehicle/VehicleCard.jsx` — rebuilt: hover lift + shadow (motion).
- `src/components/vehicle/VehicleGrid.jsx` — rebuilt: staggers cards in via Reveal.
- `src/components/home/CarOfTheDay.jsx` — rebuilt: slow Ken Burns zoom on image.
- `src/components/layout/PageTransition.jsx` — NEW. Route fade/slide wrapper.
- `src/components/layout/PublicLayout.jsx` — rebuilt: wraps routes in AnimatePresence
  + PageTransition for soft transitions between pages.
- `src/pages/Evolution.jsx` — rebuilt: connecting timeline line "draws" itself as you
  scroll (useScroll + scaleY), cards reveal in sequence.
- `src/components/brand/LogoEvolutionStrip.jsx` — NEW. Horizontal filmstrip animation
  for manufacturer logo history, wired into the Brand detail placeholder page as a demo.
- `src/lib/mock/brands.js` — added `toyotaLogoEvolution` mock data for the strip demo.
- `src/pages/Placeholder.jsx` — rebuilt: accepts `showLogoDemo` prop to render the
  LogoEvolutionStrip demo (used on `/brands/:slug`).
- `src/App.jsx` — updated: `/brands/:slug` route now passes `showLogoDemo`.

To swap the hero's SVG car for a real image: drop a transparent PNG/SVG side-profile
car cutout into `src/assets/hero/`, then in `Hero.jsx` replace `<CarSilhouette .../>`
with an `<img src={carCutout} .../>` (import the asset at the top of the file).

## Structure
- `src/pages/` — one file per route
- `src/components/` — layout, ui, and per-entity components (vehicle, brand, home...)
- `src/lib/mock/` — placeholder data standing in for Supabase queries until the DB schema is built

## Routes implemented
/, /vehicles, /evolution, /brands, /news — fully built with mock data + animations
/vehicles/:slug, /brands/:slug (has logo evolution demo), /news/:slug, /videos, /for-sale,
/dealers, /garage, /kenya, /creative, /partner-with-us — placeholder pages (scaffolded,
awaiting Phase 2+ content/data)

## Env / Supabase
See `.env.example` — copy to `.env` and fill in your Supabase project URL + anon key
when you're ready to wire up the database. Never commit `.env` (already gitignored).
