# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A SvelteKit + Tailwind CSS app called "Bridge": a service finder that helps first responders connect
people experiencing homelessness to shelter, food, medical, mental health, and other services in real
time. `src/routes/+page.svelte` is the front page; category cards there are UI placeholders — no
backend or data layer exists yet.

## Commands

```sh
npm run dev              # start dev server (Vite)
npm run build             # production build
npm run preview           # preview the production build
npm run check              # svelte-kit sync + svelte-check (type checking)
npm run check:watch        # svelte-check in watch mode
npm run test               # installs Playwright browsers, then runs e2e tests
npx playwright test <file> # run a single e2e test file
```

There is no separate lint command or unit test runner configured — `check` (svelte-check) is the
primary correctness gate, and Playwright e2e specs (`*.e2e.ts`, e.g.
`src/routes/demo/playwright/page.svelte.e2e.ts`) are the only tests.

## Architecture

- SvelteKit (Svelte 5, runes mode forced project-wide via `vite.config.ts`) with `adapter-auto` — no
  deployment target has been chosen yet.
- Tailwind CSS v4 via `@tailwindcss/vite` — there is no `tailwind.config.js`; theme customization
  (colors, fonts) lives in `@theme` blocks in CSS. The global stylesheet is `src/routes/layout.css`
  (imported by `src/routes/+layout.svelte`), which defines the `brand` (teal) and `signal` (amber)
  color scales used throughout the UI — `brand` for primary/trust elements, `signal` reserved for
  urgent actions (911, referral CTAs).
- `src/routes/+layout.svelte` is the root layout: imports `layout.css` and sets the favicon.
- Playwright config (`playwright.config.ts`) boots the app via `npm run build && npm run preview` on
  port 4173 before running e2e specs — tests run against a production build, not the dev server.
- `src/lib/` is the shared library namespace (`$lib`), currently minimal (`index.ts`, assets).

## Application Rules

### Restrictions for the application 
-Do not use real client data, HMIS records, or any personally identifying information about an actual unhoused person.
-Do not score, rank, or assign vulnerability or risk to any person, real or synthetic.
-Do not claim or imply live shelter or service capacity from HUD PIT/HIC data or from the synthetic dataset.
-Do not automate a consequential placement or eligibility decision; every handoff must show a human confirmation point.
-Do not build anything that replaces or bypasses Coordinated Entry.

### Principles
- Centers dignity, safety, and agency.
- Supports one bounded moment.
- Shows source and freshness, eligibility uncertainty, and human takeover.
- Produces a handoff summary without sensitive personal data.

### Synthetic Data


