# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A 1on1 meeting question generator — a single-page web app that presents randomized questions for 1:1 meetings. Users can pin, remove, add, and re-randomize questions. Built with Quasar Framework v2 (Vue 3) using `<script setup>` (Composition API).

## Commands

- **Dev server:** `quasar dev` (runs on port 8080, opens browser automatically)
- **Build:** `quasar build`
- **Lint:** `yarn lint` or `eslint .`
- **No tests** — `yarn test` is a no-op placeholder

Requires the Quasar CLI: `npm install -g @quasar/cli`
Requires Node >= 20.

## Architecture

This is a minimal Quasar SPA with hash-based routing. Nearly all logic lives in a single page component.

- `src/pages/Index.vue` — Main page: renders the question list, delegates logic to the `useQuestions` composable. Uses `<script setup>`.
- `src/composables/useQuestions.js` — Core logic: random selection, pin/unpin, add/remove, reload, and `localStorage` session persistence.
- `src/assets/questions.json` — Flat JSON array (~47KB) of question objects with `id`, `category`, and `question` fields.
- `src/assets/links.json` — Curated reading list shown in the sidebar drawer.
- `src/layouts/MainLayout.vue` — App shell with header toolbar and left drawer (info + links). Uses `<script setup>`.
- `src/components/EssentialLink.vue` — Simple link rendering component used in the drawer. Uses `<script setup>`.
- `index.html` — Vite entry point with Matomo analytics (matomo.main.p2lab.com).
- `quasar.config.js` — Quasar config: SPA mode, Vite, SCSS styling, Material icons.

## Key Patterns

- Questions are selected randomly at mount time from the full pool with deduplication (excludes already-displayed IDs).
- Pinned questions survive re-randomization; unpinned ones get replaced.
- Session state (questions, pin/done flags) persists to `localStorage` via a deep watcher and restores on reload. A "Clear session" button resets to fresh random questions.
- All components use `<script setup>` — no Options API or `defineComponent` boilerplate.
- ESLint v9 flat config (`eslint.config.js`) with `plugin:vue/vue3-essential` + Prettier. No TypeScript.
- Build tool: Vite (via `@quasar/app-vite`). No Babel.
- Package manager: yarn (yarn.lock present).
