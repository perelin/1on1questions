# Future Improvements

Deferred from the code review on 2026-02-16. Pick these up when ready.

## Tier 2 — Modernize Tooling

### Migrate from webpack to Vite
- Replace `@quasar/app` (deprecated package name) with `@quasar/app-vite`
- This gives faster dev server startup and HMR, faster production builds
- Drops the need for Babel entirely — remove `babel.config.js` and `@babel/eslint-parser`
- Quasar migration guide: https://quasar.dev/start/upgrade-guide

### Update ESLint
- ESLint v7 -> v9+ with flat config (`eslint.config.js` instead of `.eslintrc.js`)
- Update `eslint-plugin-vue` from v7 to v9+
- Remove `eslint-webpack-plugin` (Vite handles this natively with `vite-plugin-eslint2`)
- Remove `.eslintignore` (use `ignores` array in flat config)

### Update Node engine requirement
- `package.json` declares `node >= 12.22.1` — update to `>= 20` (current LTS)

### Package manager
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
