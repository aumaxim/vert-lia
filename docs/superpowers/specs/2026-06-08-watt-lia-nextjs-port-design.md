# Watt l'IA ? — Next.js port of the design handoff

**Date:** 2026-06-08
**Owner:** Maxime Auchet
**Source bundle:** Claude Design handoff (`design_extract/project-ingenieur-citoyen/`)

## Goal

Port the entire "Watt l'IA ?" static HTML prototype to a production Next.js 15 (App Router, TypeScript) application at the root of the working directory, preserving the visual design pixel-for-pixel. The site is a French citizen-science project that makes the ecological cost of AI (energy, CO₂, water) visible through explanations, comparisons, a calculator, and a chat demo.

## Scope

**In scope — full multi-page site:**
- `/` (Accueil) — homepage with hero, pill grid, demo feature, animated stats, comparison teaser, navigation cards, CTA
- `/comprendre` — explainer page
- `/comparer` — text vs. image vs. video comparison
- `/calculateur` — interactive calculator with sliders, presets, animated equivalences
- `/agir` — practical advice
- `/chat` — interactive chat demo with live cost meter (model call stubbed for now)
- `/sources` — methodology and sources

**Out of scope:**
- Real Anthropic API integration for the chat page. The send function is a single seam (`lib/chat.ts → sendMessage`) returning a placeholder reply until Maxime provides the API/model. Swapping in a real backend is a localized change.
- Image assets — the design is purely CSS (gradients, blurs, emoji). No images to host.
- Analytics, deployment config, CI.
- The prototype's `Accueil - 3 directions.html` (a design-comparison canvas, not a real page).

## Technical decisions

- **Framework:** Next.js 15 with App Router, React 19, TypeScript.
- **Styling:** Port the prototype's `assets/styles.css` verbatim to `styles/globals.css`, imported once in the root layout. Per-page `<style>` blocks become CSS modules colocated with their page.
- **Animations / behavior:** Port `assets/site.js` verbatim into a single `RevealClient` component mounted in the root layout. Keep the scroll-based detection (not IntersectionObserver) — the design history shows that was already debugged and chosen for robustness.
- **No CSS framework** (no Tailwind), **no animation library** (no Framer Motion), **no UI library**. The prototype's CSS already does the work.
- **Components:** server components by default. Client components only where interaction is required: `Header`, `RevealClient`, `CalculateurClient`, `ChatClient`.

## File layout

```
/
├── app/
│   ├── layout.tsx              # <Header/>, <Footer/>, RevealClient, globals.css
│   ├── page.tsx                # Accueil
│   ├── comprendre/page.tsx
│   ├── comparer/page.tsx
│   ├── calculateur/
│   │   ├── page.tsx
│   │   ├── CalculateurClient.tsx
│   │   └── calculateur.module.css
│   ├── agir/page.tsx
│   ├── chat/
│   │   ├── page.tsx
│   │   ├── ChatClient.tsx
│   │   └── chat.module.css
│   └── sources/page.tsx
├── components/
│   ├── Header.tsx              # 'use client' — usePathname() for active link + burger
│   ├── Footer.tsx              # server component
│   └── RevealClient.tsx        # 'use client' — reveal/count-up/bar-fill engine
├── lib/
│   ├── estimates.ts            # OP table, constants, formatters (fmtFR, fmtWh, fmtG)
│   └── chat.ts                 # sendMessage() — stubbed seam for the future API
├── styles/
│   └── globals.css             # verbatim port of assets/styles.css
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.local.example          # ANTHROPIC_API_KEY placeholder (commented for now)
```

## Component responsibilities

### `app/layout.tsx` (server)
- Imports `styles/globals.css`.
- Sets `<html lang="fr">`, meta charset/viewport, default metadata (title/description).
- Renders `<Header/>`, `{children}`, `<Footer/>`, `<RevealClient/>` in that order.

### `components/Header.tsx` (client)
- Uses `usePathname()` to compute the active link.
- Renders the brand, nav-links, CTA, and burger button identical to the prototype.
- CTA varies by page (matches the prototype's per-page CTA):
  - `/calculateur` → "Comment agir ?" → `/agir`
  - `/chat` → "Calculateur" → `/calculateur`
  - everywhere else → "Calculer mon impact" → `/calculateur`
- Burger toggles `.open` on the nav-links container.

### `components/Footer.tsx` (server)
- Static markup identical to the prototype's footer.

### `components/RevealClient.tsx` (client)
- On mount: queries `.reveal`, `[data-count]`, `.bf[data-w]`.
- Pre-fills counters with their final formatted value (avoids SSR/client text mismatch and avoids blank-frame flash).
- Schedules the first `pass()` via two nested `requestAnimationFrame` calls + two `setTimeout` reflows at 200ms and 500ms — verbatim from the prototype.
- Attaches passive scroll + resize listeners with `requestAnimationFrame` throttling.
- Exposes `window.fmtFR` for any inline script that may need it.

### `lib/estimates.ts`
Single source of truth for shared numbers:
```ts
export const OP = {
  text: { wh: 0.3, co2: 2, water: 0.5 },
  img:  { wh: 5,   co2: 5, water: 3 },
  vid:  { wh: 1000, co2: 400, water: 500 },
};
export const CAR_G_PER_KM = 170;
export const PHONE_WH = 15;
export const LED_W = 8;
export const BASE_TOKENS = 300;
export const BASE_WH = 0.3;
export const BASE_CO2 = 2;
export const BASE_WATER = 0.5;
export const SESSION_FULL_WH = 5;

export function fmtFR(n: number, dec = 0): string { ... }
export function fmtWh(wh: number): string { ... }
export function fmtG(g: number): string { ... }
export function fmtL(cl: number): string { ... }
export function estTokens(s: string): number { ... }
```

### `lib/chat.ts`
```ts
export type Msg = { role: 'user' | 'assistant'; content: string };
export async function sendMessage(history: Msg[]): Promise<string | null> {
  // Stub until Maxime provides the API/model.
  return 'Démo en cours de branchement — la vraie IA arrive bientôt.';
}
```
When the API is available, replace the body with `fetch('/api/chat')` and add `app/api/chat/route.ts` server-side. No other code changes.

### `app/calculateur/CalculateurClient.tsx`
- State: `{ text: number; img: number; vid: number }`, initial `{20, 3, 0}`.
- `useMemo` recomputes weekly + yearly totals using `OP` from `lib/estimates.ts`.
- Equivalences: km (yearly CO₂ ÷ 170), phone charges (yearly Wh ÷ 15), LED hours (yearly Wh ÷ 8), water in L (yearly water cL ÷ 100).
- Bar widths use the prototype's `pct(v, max)` clamp with the same anchor maxima (km:120, phone:4000, led:8000, water:800). CSS transition handles easing.
- Contextual note (3 thresholds: <2000, <20000, else) ports verbatim.
- Presets snap sliders via state setter, not DOM mutation.

### `app/chat/ChatClient.tsx`
- State: `{ history: Msg[]; suggesting: boolean; totals: {wh, co2, water, count}; lastResponse: {...} | null; sending: boolean }`.
- Suggestion chips disappear after first send.
- "Reset" clears all state and restores the initial AI greeting.
- Cost meter math identical to prototype: `inTok + outTok` via `estTokens`, ratio against `BASE_TOKENS`, scale `wh/co2/water` by ratio, accumulate, format with `fmtWh`/`fmt`.
- Calls `sendMessage(history)` from `lib/chat.ts`. On null reply, shows the prototype's error bubble.

## Static page ports

Each remaining page (`/`, `/comprendre`, `/comparer`, `/agir`, `/sources`) is a one-to-one JSX translation of the prototype HTML body (header + footer removed because layout handles those). Mechanical transforms only:
- `class` → `className`, `for` → `htmlFor`
- Inline `style="..."` strings → `style={{...}}` objects
- Page-local `<style>` blocks → `*.module.css` files imported by the page
- Internal anchors (`href="comprendre.html"`) → `<Link href="/comprendre">` from `next/link`

The `<style>` block on `app/page.tsx` (the `.demo-feature` styles) becomes `app/home.module.css` — applied via `className={styles.demoFeature}` etc. Same pattern for any other per-page styles encountered.

## Verification plan

Before claiming done:

1. `npm run build` compiles clean — no TS errors, no hydration warnings.
2. `npm run dev`, open each route in a browser:
   - Header active link correct on each page.
   - Mobile burger toggles nav at <920px.
   - Reveal animations fire on scroll for `.reveal` elements.
   - Homepage count-up animations reach their target values.
   - Comparison bars animate width on scroll.
   - Calculator sliders update results live; presets snap correctly; bar widths reflect values.
   - Chat: input + suggestion chips append messages; meter increments; reset clears state. (Uses the stub reply.)
3. Side-by-side visual comparison of the prototype `design_extract/.../index.html` opened directly vs. `localhost:3000/` — confirm pixel fidelity (spacing, colors, fonts, blurs, shadows).
4. Resize to 920px, 880px, 600px — confirm responsive rules hold.

## Risks

- **Hydration mismatch on count-up elements.** Mitigated by pre-filling JSX with the final formatted value (via `lib/estimates.ts → fmtFR`) so server-rendered text matches what the client paints before animation starts. If `Intl.NumberFormat('fr-FR')` produces different output server vs. client in edge cases, force the locale explicitly with `new Intl.NumberFormat('fr-FR', ...)` and avoid relying on `toLocaleString` without a locale argument.
- **Inline `style="width:X%"` selectors in the calculator's mobile CSS.** The prototype uses `section .wrap[style*="grid"]` to target grid containers responsively. This works because inline styles survive the JSX-to-DOM transition. Keep these selectors in the colocated CSS module — they'll still match because React preserves the inline `style` attribute on the DOM node.
- **Font loading flash.** The prototype imports Google Fonts via `@import` in CSS. Keep that for verbatim parity, but optionally switch to `next/font` later for better LCP — not in scope for this spec.
