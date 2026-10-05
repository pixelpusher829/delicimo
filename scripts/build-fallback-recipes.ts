// Builds src/data/fallback-recipes.json: a snapshot of real Spoonacular recipes
// for each home-page category. The app falls back to these when live search is
// unavailable (e.g. the daily quota is used up), and `bun dev` uses them in
// mock mode.
//
// Costs roughly 1.5 quota points per category. Run with:
//   bun run fallback:update

import { writeFileSync } from "node:fs";
import { slimRecipe } from "../api/_lib/spoonacular";
import type { Recipe } from "../src/types";

const PER_CATEGORY = 6;

// Keys must match the home-page category and quick-pick queries.
const CATEGORIES: Record<string, Record<string, string>> = {
  breakfast: { type: "breakfast" },
  chicken: { query: "chicken", type: "main course" },
  pasta: { query: "pasta" },
  salmon: { query: "salmon" },
  salad: { query: "salad", type: "salad" },
  soup: { query: "soup", type: "soup" },
  quick: { maxReadyTime: "20", type: "main course" },
  dessert: { type: "dessert" },
  vegan: { diet: "vegan", type: "main course" },
};

const key = process.env.SPOONACULAR_API_KEY;
if (!key) throw new Error("SPOONACULAR_API_KEY is not set (check .env.local)");

const recipes = new Map<number, Recipe>();
const categories: Record<string, number[]> = {};

for (const [name, filters] of Object.entries(CATEGORIES)) {
  const params = new URLSearchParams({
    ...filters,
    number: String(PER_CATEGORY),
    sort: "popularity",
    instructionsRequired: "true",
    addRecipeInformation: "true",
    addRecipeInstructions: "true",
    addRecipeNutrition: "true",
  });
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params}`,
    { headers: { "x-api-key": key } },
  );
  if (!res.ok) {
    throw new Error(`${name}: Spoonacular returned ${res.status}`);
  }
  const data = (await res.json()) as { results: Recipe[] };
  categories[name] = data.results.map((r) => r.id);
  for (const r of data.results) recipes.set(r.id, slimRecipe(r));
  console.log(
    `${name}: ${data.results.length} recipes (quota left: ${res.headers.get("x-api-quota-left")})`,
  );
}

writeFileSync(
  new URL("../src/data/fallback-recipes.json", import.meta.url),
  JSON.stringify({ categories, recipes: [...recipes.values()] }),
);
console.log(`Saved ${recipes.size} recipes.`);
