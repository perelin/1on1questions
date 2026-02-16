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

## Tier 3 — Refactor Application Code

### Consistent Vue API style
- `MainLayout.vue` uses Composition API (`setup()`), `Index.vue` uses Options API
- Migrate everything to `<script setup>` (modern Vue 3 standard)
- This also removes the `defineComponent` boilerplate

### Extract question logic into a composable
- Create `src/composables/useQuestions.js`
- Move randomization, pin/unpin, add/remove logic out of the component
- Makes the logic testable independently of the UI

### Add state persistence
- Use `localStorage` to save the current session (selected questions, pin state, done state)
- Restore on page reload
- This addresses the README todo: "save session locally"

### Improve question data model
- `questions.json` has unused `created_at` / `updated_at` fields — strip them to reduce bundle size
- Consider a lighter format or lazy-loading if the dataset grows significantly

### Use `item.id` as `:key` instead of array index
- `v-for="(item, index) in randomQuestions" :key="index"` — using index as key
  causes Vue to reuse DOM nodes incorrectly when items are reordered or removed
- Change to `:key="item.id"` for correct DOM diffing
