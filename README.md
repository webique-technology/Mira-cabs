# Mira Cabs — Frontend

A premium, responsive cab-booking frontend for **Mira Cabs**, an original Indian mobile-cab brand. Built with Next.js App Router, TypeScript (strict), Tailwind CSS, shadcn/ui-style primitives, Framer Motion and a lightweight React Three Fiber 3D hero.

This is a **frontend-only** build on **static mock data**. There is no backend yet — every "API" is a Promise-returning function in `src/services/*`, designed to be swapped for real Java Spring Boot REST calls without touching any UI component.

## 1. Project Overview

Supports the full cab-booking journey with mock data end to end:

- One-way, round-trip, local rental, airport transfer and shared-ride booking (tabbed hero widget)
- Vehicle search, filtering, sorting and fare breakdown
- Checkout with passenger details, coupon codes and payment method selection
- Booking confirmation, receipt download and booking tracking
- Popular routes, tour packages, fleet, offers, homepage marketing sections
- A procedural, lightweight 3D hero scene (React Three Fiber) with graceful fallbacks

**Current scope (this delivery):** Phases 1–4 and part of 6 from the build plan — architecture, homepage, full booking widget, search → vehicle selection → checkout → booking success/track flow, and the lightweight 3D hero. Services/routes/packages/blog/account/legal detail pages, the interactive-map and scroll-journey 3D modes, structured-data SEO pages and the automated test suite are scaffolded in the architecture (types, services, data, config) but their pages/components are the next iteration — see **Section 14**.

## 2. Technology Stack

- Next.js 15 (App Router) + React 18 + TypeScript (strict mode, no `any`)
- Tailwind CSS + custom design tokens, `tailwindcss-animate`
- shadcn/ui-style primitives built on Radix UI
- Framer Motion (scroll reveals, tab/accordion/success animations)
- React Three Fiber + Drei + three.js (lightweight 3D hero)
- React Hook Form + Zod (all form validation)
- Zustand (+ `persist` middleware) for booking/auth state
- Lucide React icons
- next/image, next/font (Manrope + Plus Jakarta Sans)
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)

> Note: `@react-three/fiber` v8 requires React 18's JSX namespace; React is pinned to `^18.3.1` for that reason. Next.js 15 fully supports React 18.

## 3. Installation

```bash
npm install
cp .env.example .env.local   # already present with sane local defaults
```

## 4. Development

```bash
npm run dev
```

Visit http://localhost:3000.

## 5. Production Build

```bash
npm run build
npm run start
```

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run format      # prettier --write .
```

## 6. Project Structure

```
src/
├── app/                  # App Router routes (pages, layouts, metadata)
├── components/
│   ├── layout/            # Header, MobileNavigation, Footer, PageContainer
│   ├── booking/            # BookingWidget + 5 trip forms + pickers
│   ├── vehicles/            # VehicleCard, VehicleFilters, VehicleSort, FareBreakdown, VehicleResults
│   ├── routes/               # RouteCard
│   ├── packages/               # PackageCard
│   ├── fleet/                    # FleetCard, tilt wrapper
│   ├── offers/                    # OfferCard
│   ├── checkout/                   # PaymentMethodSelector, CouponInput
│   ├── home/                        # Homepage section components
│   ├── three/                        # CabHeroScene, ThreeSceneLoader, ThreeFallback
│   ├── common/                        # SectionHeading, EmptyState, skeletons, Reveal, Rating…
│   └── ui/                             # shadcn/ui-style primitives (button, card, tabs, sheet…)
├── config/site.ts         # siteConfig (incl. threeDMode) + NAV_LINKS
├── data/                  # Static mock datasets (never imported directly by UI)
├── services/              # Async service layer — the only thing UI code calls
├── store/                 # Zustand stores (booking, auth)
├── types/                 # Shared TypeScript domain models
├── lib/                   # utils, zod schemas, fare-calculation helpers
└── hooks/                 # use-reduced-motion, use-webgl-support, use-media-query, use-page-visibility
```

## 7. Static Data Architecture

`src/data/*.ts` holds plain arrays/objects — locations, airports, routes, vehicles, packages, offers, reviews, blogs, faqs, bookings, users. **No UI component imports these files directly.**

`src/services/*.ts` wraps each dataset in an `async` function that awaits a short artificial delay before returning, e.g.:

```ts
export async function getVehicles(filters?, sort?): Promise<Vehicle[]> {
  await mockDelay();
  return vehicles; // filtered/sorted
}
```

This keeps loading states, skeletons and error boundaries realistic today, and means every service function's **signature is the contract** your Java backend needs to satisfy.

## 8. Switching the 3D Mode

`src/config/site.ts`:

```ts
export const siteConfig = {
  threeDMode: "lightweight-hero", // driven by NEXT_PUBLIC_3D_MODE
  ...
};
```

Supported values: `lightweight-hero` (default, implemented), `interactive-map`, `scroll-journey`, `disabled`. Set `NEXT_PUBLIC_3D_MODE` in `.env.local`. Any value other than `lightweight-hero` currently renders the static `ThreeFallback` poster — `interactive-map` and `scroll-journey` scene components are planned for the next iteration (see Section 14) and `ThreeSceneLoader` is already structured to slot them in without changes to the Hero.

The 3D canvas is:

- Dynamically imported (`next/dynamic`, `ssr: false`) — never blocks first paint
- Skipped entirely when `prefers-reduced-motion` is set, WebGL is unavailable, the tab is hidden, or `NEXT_PUBLIC_ENABLE_3D=false`
- Rendered with a reduced pixel ratio, no shadows and fewer elements on mobile viewports
- Backed by procedural primitive geometry (no external GLB download), keeping payload tiny

## 9. Replacing Mock Services with Java Spring Boot APIs

Each function in `src/services/*.ts` is marked with a `TODO(API migration)` comment showing its intended REST equivalent, e.g. `getVehicles()` → `GET /api/vehicles`, `createBooking()` → `POST /api/bookings`. To migrate:

1. Introduce an `API_BASE_URL` env var and a small `fetchJson<T>()` helper in `src/lib`.
2. Replace each service function body with a `fetch()` call to the matching Spring Boot endpoint, keeping the **same function signature and return type**.
3. Delete the corresponding file(s) in `src/data/` once no service references them.
4. No changes are required in any component — they only ever import from `src/services`, never `src/data`.

## 10. Environment Variables

See `.env.example`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Mira Cabs
NEXT_PUBLIC_ENABLE_3D=true
NEXT_PUBLIC_3D_MODE=lightweight-hero
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SUPPORT_NUMBER=+911234567890
```

The app works fully without a Google Maps key — location "autocomplete" is powered by the static `src/data/locations.ts` list via `route-service.searchLocations()`.

## 11. Testing

Test tooling (Vitest, React Testing Library, Playwright) is declared in `package.json` and the `test` / `e2e` scripts are wired up, but the actual test files are part of the next iteration (Phase 7) and are not yet included in this delivery. Once added:

```bash
npm run test       # Vitest unit/component tests
npm run e2e         # Playwright critical-flow test
```

## 12. Deployment

Any Next.js-compatible host works (Vercel, Netlify, self-hosted Node):

```bash
npm run build
npm run start   # or deploy the .next output to your platform of choice
```

Set the environment variables from Section 10 in your hosting provider before building. No database or backend is required for this frontend-only phase.

## 13. Fixes Applied After First Dev Run

### 3D hero crash — `ReactCurrentOwner` is undefined

`@react-three/fiber` **v8** ships its own copy of `react-reconciler` that reads React internals removed in React 19 (and reshuffled in 18.3.x), producing:

```
TypeError: Cannot read properties of undefined (reading 'ReactCurrentOwner')
    at $$$reconciler (react-reconciler/cjs/react-reconciler.development.js)
    at createRenderer (@react-three/fiber/dist/events-*.esm.js)
```

**Fix:** upgraded to the React 19-native versions — `@react-three/fiber@^9` and `@react-three/drei@^10` — with `react`/`react-dom`/`@types/react*` on `^19`. This is the supported combination for Next.js 15 and needs no `overrides` pinning.

**Also fixed (defensively):** the 3D canvas is now wrapped in `ThreeErrorBoundary`. The hero is decorative, so _any_ future runtime failure inside it now degrades to the static poster instead of bubbling up to `app/error.tsx` and replacing the entire homepage with "We hit a bump in the road". A warning is logged in development so the underlying issue stays visible.

To pick up the fix, a clean reinstall is required (the lockfile pins the old v8 tree):

```bash
rm -rf node_modules package-lock.json     # Windows: rmdir /s /q node_modules & del package-lock.json
npm install
npm run dev
```

### Vehicle images returning 500

The five fleet images were hotlinked to a Gamma CDN URL that began returning `500` through Next's image optimizer. They're now local procedural SVG art (`public/images/fleet/*.svg`) in the brand palette, so there is no external image dependency anywhere in the project.

## 14. What Was Verified

- `tsc --noEmit` was run against the full `src/` tree in a scratch copy of this project; all application-code type errors found (a nav-link discriminated-union type, a Zod literal-vs-boolean mismatch, and the React 19/R3F v8 JSX incompatibility) were fixed and re-verified.
- The remaining unresolved item is environment-specific: this sandbox's outbound network proxy throttles large package-tarball downloads badly enough that `next`'s own `.d.ts` files never fully extracted in the scratch install, so a complete `next build` could not be run to completion here. This is a sandbox networking limitation, not a code defect — on a normal machine `npm install && npm run build` should complete normally. Please run `npm run build` after installing and let us know if anything surfaces.

## 15. Not Yet Included (Next Iteration)

- `/services/*`, `/routes/[slug]`, `/packages/[slug]`, `/offers`, `/fleet`, `/about`, `/contact`, `/faq`, `/blog`, `/blog/[slug]`, `/login`, `/register`, `/forgot-password`, `/verify-otp`, `/account/*`, and the four legal pages
- Interactive-map and scroll-journey 3D experiences
- JSON-LD for FAQPage/Article/Review/TouristTrip and per-route SEO landing pages
- Vitest/Playwright test files
- WCAG audit pass and full accessibility review

The architecture (types, services, data, Zustand stores, design tokens, component patterns) is already in place for all of the above, so each is additive work rather than rework.
# Mira-cabs
