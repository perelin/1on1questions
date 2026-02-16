# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A 1on1 meeting question generator — a single-page web app that presents randomized questions for 1:1 meetings. Users can pin, remove, add, and re-randomize questions. Built with Quasar Framework v2 (Vue 3) using the Options API.

## Commands

- **Dev server:** `quasar dev` (runs on port 8080, opens browser automatically)
- **Build:** `quasar build`
- **Lint:** `yarn lint` or `eslint --ext .js,.vue ./`
- **No tests** — `yarn test` is a no-op placeholder

Requires the Quasar CLI: `npm install -g @quasar/cli`

## Architecture

This is a minimal Quasar SPA with hash-based routing. Nearly all logic lives in a single page component.

- `src/pages/Index.vue` — The entire app logic: randomizes questions from the JSON pool, handles pin/remove/add/reload. Uses Vue Options API with `data()`, `methods`, and `mounted()`.
- `src/assets/questions.json` — Large (~78KB) flat JSON array of question objects with `category` and `question` fields. This is the question database.
- `src/assets/links.json` — Curated reading list shown in the sidebar drawer.
- `src/layouts/MainLayout.vue` — App shell with header toolbar and left drawer (info + links). Uses Composition API (`setup()`).
- `src/components/EssentialLink.vue` — Simple link rendering component used in the drawer.
- `src/index.template.html` — HTML template with Matomo analytics (matomo.main.p2lab.com).
- `quasar.conf.js` — Quasar config: SPA mode, webpack with ESLint plugin, SCSS styling, Material icons.

## Key Patterns

- Questions are selected randomly at mount time from the full pool — no deduplication (same question can appear twice).
- Pinned questions survive re-randomization; unpinned ones get replaced.
- The `done` and `pinned` flags are mutated directly on question objects from the shared JSON import, meaning state doesn't persist across page reloads.
- ESLint uses `plugin:vue/vue3-essential` + Prettier config. No TypeScript.
- Package manager: yarn (yarn.lock present).
