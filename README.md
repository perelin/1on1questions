# 1on1 Questions

A question generator for 1:1 meetings. Presents a randomized set of questions from a curated pool — pin the ones you like, remove the rest, add your own.

## Features

- Random question selection from ~200 categorized questions
- Pin questions to keep them across re-rolls
- Mark questions as done
- Add custom questions on the fly
- Session persistence via localStorage

## Setup

Requires Node >= 20 and the Quasar CLI:

```bash
npm install -g @quasar/cli
yarn install
```

## Development

```bash
quasar dev        # starts dev server on port 8080
quasar build      # production build to dist/
yarn lint         # ESLint check
```

## Tech Stack

- [Quasar Framework](https://quasar.dev) v2 (Vue 3, Composition API)
- Vite
- SCSS
