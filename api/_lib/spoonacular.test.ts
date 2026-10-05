import { describe, expect, it, vi } from "vitest";
import {
  cleanSummary,
  getRecipe,
  PAGE_SIZE,
  searchRecipes,
  type Upstream,
} from "./spoonacular";
import type { Recipe } from "../../src/types";

const ok = (body: unknown) => vi.fn<Upstream>(async () => Response.json(body));

describe("searchRecipes", () => {
  it("normalizes params so equivalent requests share a cache entry", async () => {
    const upstream = ok({
      results: [],
      offset: 0,
      number: PAGE_SIZE,
      totalResults: 0,
    });
    await searchRecipes(
      new URL("http://x/api/recipes/search?q=%20Pasta%20&offset=30&number=999"),
      upstream,
    );
    const [path, params] = upstream.mock.calls[0];
    expect(path).toBe("/recipes/complexSearch");
    expect(params.get("query")).toBe("pasta");
    expect(params.get("offset")).toBe(String(PAGE_SIZE)); // snapped to page boundary
    expect(params.get("number")).toBe(String(PAGE_SIZE)); // client can't override
    expect(params.get("addRecipeNutrition")).toBe("true");
  });

  it("caches successes at the edge", async () => {
    const res = await searchRecipes(
      new URL("http://x/api/recipes/search?q=soup"),
      ok({ results: [], offset: 0, number: PAGE_SIZE, totalResults: 0 }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toContain("s-maxage=86400");
  });

  it("rejects empty queries without calling upstream", async () => {
    const upstream = ok({});
    const res = await searchRecipes(
      new URL("http://x/api/recipes/search?q=%20"),
      upstream,
    );
    expect(res.status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });

  it("passes quota errors through and never caches them", async () => {
    const res = await searchRecipes(
      new URL("http://x/api/recipes/search?q=soup"),
      async () => new Response("{}", { status: 402 }),
    );
    expect(res.status).toBe(402);
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("reports a missing API key", async () => {
    const res = await searchRecipes(
      new URL("http://x/api/recipes/search?q=soup"),
    );
    expect(res.status).toBe(500);
  });
});

describe("getRecipe", () => {
  it("validates the id", async () => {
    const upstream = ok({});
    const res = await getRecipe("../../users", upstream);
    expect(res.status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });

  it("trims the payload to the fields the UI uses", async () => {
    const res = await getRecipe(
      "1",
      ok({
        id: 1,
        title: "Soup",
        cuisines: [],
        servings: 2,
        readyInMinutes: 10,
        healthScore: 5,
        winePairing: { huge: true },
        nutrition: {
          nutrients: [
            {
              name: "Calories",
              amount: 100,
              unit: "kcal",
              percentOfDailyNeeds: 5,
            },
            { name: "Vitamin K", amount: 1, unit: "µg" },
          ],
          flavonoids: [],
        },
      }),
    );
    const body = (await res.json()) as Recipe;
    expect(body).not.toHaveProperty("winePairing");
    expect(body.nutrition?.nutrients.map((n) => n.name)).toEqual(["Calories"]);
  });
});

describe("cleanSummary", () => {
  it("strips HTML and promo sentences", () => {
    const html =
      'Rice and beans is a <b>main course</b> that serves 2. It costs <b>$1.06 per serving</b>. If you like this recipe, you might also like <a href="x">Beans</a>.';
    expect(cleanSummary(html)).toBe(
      "Rice and beans is a main course that serves 2. It costs $1.06 per serving.",
    );
  });
});
