import { describe, expect, it } from "vitest";
import type { Recipe } from "@/types";
import {
  applyFilters,
  getCuisines,
  NO_FILTERS,
  parseFilters,
  serializeFilters,
  type Filters,
} from "./filters";

const recipe = (overrides: Partial<Recipe>): Recipe => ({
  id: 1,
  title: "Recipe",
  servings: 2,
  readyInMinutes: 30,
  healthScore: 50,
  cuisines: [],
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  ...overrides,
});

const recipes = [
  recipe({
    id: 1,
    readyInMinutes: 45,
    healthScore: 20,
    aggregateLikes: 5,
    cuisines: ["Italian"],
  }),
  recipe({
    id: 2,
    readyInMinutes: 10,
    healthScore: 90,
    aggregateLikes: 50,
    vegan: true,
    vegetarian: true,
  }),
  recipe({
    id: 3,
    readyInMinutes: 25,
    healthScore: 60,
    aggregateLikes: 500,
    vegetarian: true,
    cuisines: ["Italian", "Greek"],
  }),
];

const filters = (patch: Partial<Filters>): Filters => ({
  q: "x",
  ...NO_FILTERS,
  ...patch,
});

const ids = (rs: Recipe[]) => rs.map((r) => r.id);

describe("applyFilters", () => {
  it("returns everything in original order with no filters", () => {
    expect(ids(applyFilters(recipes, filters({})))).toEqual([1, 2, 3]);
  });

  it("filters by cuisine, diet and time together", () => {
    expect(ids(applyFilters(recipes, filters({ cuisine: "Italian" })))).toEqual(
      [1, 3],
    );
    expect(
      ids(applyFilters(recipes, filters({ diets: ["vegetarian"] }))),
    ).toEqual([2, 3]);
    expect(
      ids(applyFilters(recipes, filters({ diets: ["vegetarian", "vegan"] }))),
    ).toEqual([2]);
    expect(ids(applyFilters(recipes, filters({ maxTime: 30 })))).toEqual([
      2, 3,
    ]);
    expect(
      ids(applyFilters(recipes, filters({ cuisine: "Italian", maxTime: 30 }))),
    ).toEqual([3]);
  });

  it("sorts without mutating the input", () => {
    expect(ids(applyFilters(recipes, filters({ sort: "quickest" })))).toEqual([
      2, 3, 1,
    ]);
    expect(ids(applyFilters(recipes, filters({ sort: "healthiest" })))).toEqual(
      [2, 3, 1],
    );
    expect(ids(applyFilters(recipes, filters({ sort: "popular" })))).toEqual([
      3, 2, 1,
    ]);
    expect(ids(recipes)).toEqual([1, 2, 3]);
  });
});

describe("URL round trip", () => {
  it("parses and serializes filters", () => {
    const params = new URLSearchParams(
      "q=pasta&cuisine=Italian&diet=vegan,bogus&time=30&sort=quickest",
    );
    const parsed = parseFilters(params);
    expect(parsed).toEqual({
      q: "pasta",
      cuisine: "Italian",
      diets: ["vegan"],
      maxTime: 30,
      sort: "quickest",
    });
    expect(serializeFilters(parsed).toString()).toBe(
      "q=pasta&cuisine=Italian&diet=vegan&time=30&sort=quickest",
    );
  });

  it("omits defaults and ignores invalid values", () => {
    const parsed = parseFilters(
      new URLSearchParams("q=soup&sort=nope&time=abc"),
    );
    expect(parsed.sort).toBe("relevance");
    expect(parsed.maxTime).toBeNull();
    expect(serializeFilters(parsed).toString()).toBe("q=soup");
  });
});

it("lists unique cuisines alphabetically", () => {
  expect(getCuisines(recipes)).toEqual(["Greek", "Italian"]);
});
