# Future Improvements

Deferred from the code review on 2026-02-16. Pick these up when ready.

## ~~Tier 2 — Modernize Tooling~~ (Completed 2026-02-16)

- Migrated from `@quasar/app` (webpack) to `@quasar/app-vite` v2
- Upgraded ESLint v7 → v9 with flat config (`eslint.config.js`)
- Upgraded `eslint-plugin-vue` v7 → v9, `eslint-config-prettier` v8 → v10
- Removed Babel (`babel.config.js`, `@babel/eslint-parser`), `core-js`, `eslint-webpack-plugin`
- Updated Node engine requirement to `>= 20`
- Switched VS Code recommendation from Vetur to Volar

### Remaining
- Consider migrating from yarn v1 to a modern package manager (yarn v4, pnpm, or npm)

## ~~Tier 3 — Refactor Application Code~~ (Completed 2026-02-16)

- Migrated all components (`EssentialLink.vue`, `MainLayout.vue`, `Index.vue`) to `<script setup>`
- Extracted question logic into `src/composables/useQuestions.js`
- Added `localStorage` session persistence with deep watch (restores on reload)
- Stripped unused `created_at`/`updated_at` fields from `questions.json` (~78KB → ~47KB)
- Fixed `:key` binding from array index to `item.id` for correct DOM diffing
- Added "Clear session" button to reset saved state
