import { describe, expect, it } from "vitest";
import data from "@/data/fallback-recipes.json";
import { isCompleteRecipe } from "./recipe";
import { searchFallback, type FallbackData } from "./fallback";

const sample = data as FallbackData;

// Must match the home-page category tiles and quick picks.
const CATEGORY_QUERIES = [
  "breakfast",
  "chicken",
  "pasta",
  "salmon",
  "salad",
  "soup",
  "quick",
  "dessert",
  "vegan",
];

describe("sample recipe data", () => {
  it("has a handful of recipes for every category", () => {
    for (const q of CATEGORY_QUERIES) {
      expect(sample.categories[q]?.length, q).toBeGreaterThanOrEqual(4);
    }
  });

  it("only contains recipes the detail page can fully render", () => {
    expect(sample.recipes.filter((r) => !isCompleteRecipe(r))).toEqual([]);
  });
});

describe("searchFallback", () => {
  it("returns the category set for category queries", () => {
    const { recipes, matched } = searchFallback(sample, "  Soup ");
    expect(matched).toBe(true);
    expect(recipes.map((r) => r.id)).toEqual(sample.categories.soup);
  });

  it("matches free-text searches against titles and ingredients", () => {
    const { recipes, matched } = searchFallback(sample, "lentils");
    expect(matched).toBe(true);
    expect(recipes.length).toBeGreaterThan(0);
    expect(
      recipes.every((r) => JSON.stringify(r).toLowerCase().includes("lentil")),
    ).toBe(true);
  });

  it("still returns popular recipes when nothing matches", () => {
    const { recipes, matched } = searchFallback(sample, "zzqx");
    expect(matched).toBe(false);
    expect(recipes.length).toBeGreaterThan(0);
  });
});
