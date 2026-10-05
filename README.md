# Delicimo 🍳

A fast, mobile-friendly recipe search app built with React 19, Vite, Tailwind CSS 4 and TanStack Query, powered by the [Spoonacular API](https://spoonacular.com/food-api).

## Features

- **Recipe search** with diet, cuisine, max-time and sort filters (all stored in the URL, so links and the back button work)
- **Recipe pages** with a servings scaler, US/metric units, ingredient and step check-off (remembered per recipe), a copyable shopping list, nutrition with % daily value, and similar recipes
- **Saved recipes** and **recently viewed**, stored on the device and available offline
- Share (native share sheet or copy link) and a print-friendly layout
- Skeleton loading, empty and error states, a 404 page, and keyboard and screen-reader support

## Built around a tight API quota

Spoonacular's free tier allows about 150 points a day, so the app is designed to make as few calls as possible:

| Technique | Effect |
| --- | --- |
| **Serverless proxy with edge caching** (`api/`) | Each unique search or recipe reaches Spoonacular at most about once a day, across *all* users. The API key never reaches the browser. |
| **One rich search call** (`addRecipeInformation` + `addRecipeInstructions` + `addRecipeNutrition`) | Search results carry full recipe details, so opening a recipe from results costs **0** calls. |
| **TanStack Query cache persisted to localStorage** (7 days, `staleTime: Infinity`) | Reloads, back/forward and repeat visits cost 0. |
| **Client-side filters and sorting** | Changing filters costs 0. |
| **Normalized, whitelisted params** | `"Pasta "` and `"pasta"` share one cache entry, and clients can't vary `number` or other flags. |
| **Payload trimming** | Responses keep only the fields the UI uses, so caches stay small. |
| **No retries on 4xx, no refetch on focus, submit-only search** | No accidental calls. |
| **Similar recipes from cache; saved/recent store full recipes** | 0 calls. |

When live search is unavailable (for example, the daily quota is used up), the app falls back to a bundled set of real sample recipes for every category, with a notice explaining why. Cached, saved and recently viewed recipes keep working as normal.

## Getting started

Requires [Bun](https://bun.sh/) (or Node 20+).

```bash
bun install
bun dev                      # http://localhost:5182
```

### Scripts

```bash
bun dev        # dev server with the API proxy
bun run build  # type-check and production build
bun run test   # unit tests (Vitest)
bun run lint   # ESLint
bun run format # Prettier
```

## Project structure

```
api/                    Vercel Functions (server-only)
  _lib/spoonacular.ts   Proxy logic: validation, caching headers, payload trimming
  recipes/search.ts     GET /api/recipes/search?q=&offset=
  recipes/[id].ts       GET /api/recipes/:id
src/
  api/                  Fetch client, QueryClient and persistence, query factories
  components/           Shared UI (recipe cards, search form, status messages, shadcn/ui)
  hooks/                URL filter state, saved/recent lists, localStorage state
  lib/                  Pure helpers (filters, formatting, recipe store), unit tested
  layout/               Header, footer, root layout
  pages/                Home (search + discover), recipe, saved, 404
  data/                 Sample recipes (rebuild with `bun run fallback:update`)
scripts/                Maintenance scripts
```

## License

MIT
