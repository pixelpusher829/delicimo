// Sample-recipe search used when live search is unavailable (e.g. the daily API
// quota is used up), and by `bun dev` in mock mode. The data is a snapshot of real
// Spoonacular recipes built by scripts/build-fallback-recipes.ts.
// vite.config.ts imports this too, so use only relative runtime imports here.

import type { Recipe } from "../types";
import { normalizeQuery } from "./query";

export interface FallbackData {
  /** Home-page category query -> recipe ids */
  categories: Record<string, number[]>;
  recipes: Recipe[];
}

export interface FallbackResult {
  recipes: Recipe[];
  /** False when nothing matched and we're showing a general selection instead. */
  matched: boolean;
}

export function searchFallback(data: FallbackData, q: string): FallbackResult {
  const query = normalizeQuery(q);
  const byId = new Map(data.recipes.map((r) => [r.id, r]));

  const category = data.categories[query];
  if (category) {
    return {
      recipes: category.flatMap((id) => byId.get(id) ?? []),
      matched: true,
    };
  }

  // Score by how many search words appear in the recipe's text. Trailing "s" is
  // dropped so "cookies" matches "cookie".
  const words = query
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w.replace(/s$/, ""));
  const scored = data.recipes
    .map((r) => {
      const text = [
        r.title,
        ...r.cuisines,
        ...(r.dishTypes ?? []),
        ...(r.diets ?? []),
        ...(r.extendedIngredients ?? []).map((i) => i.name),
      ]
        .join(" ")
        .toLowerCase();
      return { r, score: words.filter((w) => text.includes(w)).length };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    return { recipes: scored.map((x) => x.r), matched: true };
  }

  const popular = data.recipes.toSorted(
    (a, b) => (b.aggregateLikes ?? 0) - (a.aggregateLikes ?? 0),
  );
  return { recipes: popular.slice(0, 12), matched: false };
}
