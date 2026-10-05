// Server-only Spoonacular proxy. Runs as a Vercel Function in production and as
// Vite dev middleware locally (see vite.config.ts). The API key never reaches the
// browser: it's read from SPOONACULAR_API_KEY (no VITE_ prefix) at request time.
//
// Quota strategy:
// - Params are whitelisted and normalized, so equivalent requests share one CDN
//   cache entry (Vercel caches by full URL).
// - Successful responses are cached at the edge for a day, and served stale for a
//   week while revalidating. Errors are never cached.
// - One rich search call returns everything the recipe page needs, so opening a
//   recipe from search results costs nothing.
// - Payloads are trimmed to the fields the UI uses, which keeps client caches small.

import { normalizeQuery } from "../../src/lib/query.js";
import type { Ingredient, Recipe, SearchResponse } from "../../src/types";

const BASE_URL = "https://api.spoonacular.com";
export const PAGE_SIZE = 24;
// Spoonacular rejects offsets above 900.
const MAX_OFFSET = 900;

const CACHE_OK =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";
const NO_STORE = "no-store";

export type Upstream = (
  path: string,
  params: URLSearchParams,
) => Promise<Response>;

export function spoonacularUpstream(apiKey: string): Upstream {
  return (path, params) => {
    const url = new URL(path, BASE_URL);
    url.search = params.toString();
    return fetch(url, { headers: { "x-api-key": apiKey } });
  };
}

function json(body: unknown, status: number, cacheControl: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
    },
  });
}

async function callUpstream(
  upstream: Upstream | undefined,
  path: string,
  params: URLSearchParams,
  transform: (data: unknown) => unknown,
): Promise<Response> {
  if (!upstream) {
    return json(
      { error: "The server is missing SPOONACULAR_API_KEY." },
      500,
      NO_STORE,
    );
  }

  let res: Response;
  try {
    res = await upstream(path, params);
  } catch {
    return json({ error: "Recipe service is unreachable." }, 502, NO_STORE);
  }

  if (!res.ok) {
    // 402 = daily quota used up, 429 = rate limited. Pass both through so the UI
    // can explain what happened. Anything else becomes a generic upstream error.
    const status = [402, 404, 429].includes(res.status) ? res.status : 502;
    const error =
      status === 402
        ? "Daily recipe quota reached."
        : status === 429
          ? "Too many requests. Try again in a moment."
          : status === 404
            ? "Recipe not found."
            : "Recipe service error.";
    return json({ error }, status, NO_STORE);
  }

  const out = json(transform(await res.json()), 200, CACHE_OK);
  const quotaLeft = res.headers.get("x-api-quota-left");
  if (quotaLeft) out.headers.set("x-api-quota-left", quotaLeft);
  return out;
}

export function searchRecipes(url: URL, upstream?: Upstream) {
  const query = normalizeQuery(url.searchParams.get("q") ?? "");
  if (!query) return json({ error: "Missing search query." }, 400, NO_STORE);

  // Snap offset to a page boundary so offsets can't fragment the cache.
  const rawOffset = Number(url.searchParams.get("offset") ?? 0) || 0;
  const offset = Math.min(
    MAX_OFFSET,
    Math.max(0, Math.floor(rawOffset / PAGE_SIZE) * PAGE_SIZE),
  );

  const params = new URLSearchParams({
    query,
    offset: String(offset),
    number: String(PAGE_SIZE),
    addRecipeInformation: "true",
    addRecipeInstructions: "true",
    addRecipeNutrition: "true",
    instructionsRequired: "true",
  });

  return callUpstream(upstream, "/recipes/complexSearch", params, (data) => {
    const d = data as SearchResponse;
    return {
      results: (d.results ?? []).map(slimRecipe),
      offset: d.offset ?? offset,
      number: d.number ?? PAGE_SIZE,
      totalResults: d.totalResults ?? 0,
    } satisfies SearchResponse;
  });
}

export function getRecipe(id: string, upstream?: Upstream) {
  if (!/^\d{1,10}$/.test(id)) {
    return json({ error: "Invalid recipe id." }, 400, NO_STORE);
  }
  const params = new URLSearchParams({ includeNutrition: "true" });
  return callUpstream(upstream, `/recipes/${id}/information`, params, (data) =>
    slimRecipe(data as Recipe),
  );
}

/** Routes /api/recipes/search and /api/recipes/:id. Used by the Vite dev server. */
export function handleApiRequest(url: URL, upstream?: Upstream) {
  if (url.pathname === "/api/recipes/search") {
    return searchRecipes(url, upstream);
  }
  const match = url.pathname.match(/^\/api\/recipes\/([^/]+)$/);
  if (match) return getRecipe(match[1], upstream);
  return json({ error: "Not found." }, 404, NO_STORE);
}

const KEPT_NUTRIENTS = new Set([
  "Calories",
  "Fat",
  "Saturated Fat",
  "Carbohydrates",
  "Net Carbohydrates",
  "Sugar",
  "Cholesterol",
  "Sodium",
  "Protein",
  "Fiber",
]);

// Search results (complexSearch) don't include extendedIngredients. Instead they
// list per-serving amounts under nutrition.ingredients.
type RawRecipe = Recipe & {
  nutrition?: {
    ingredients?: Pick<Ingredient, "id" | "name" | "amount" | "unit">[];
  };
};

function ingredientsFromNutrition(r: RawRecipe): Ingredient[] | undefined {
  const servings = r.servings || 1;
  return r.nutrition?.ingredients?.map(({ id, name, amount, unit }) => ({
    id,
    name,
    amount: amount * servings,
    unit,
  }));
}

export function slimRecipe(r: RawRecipe): Recipe {
  return {
    id: r.id,
    title: r.title,
    image: r.image,
    servings: r.servings,
    readyInMinutes: r.readyInMinutes,
    healthScore: r.healthScore,
    aggregateLikes: r.aggregateLikes,
    pricePerServing: r.pricePerServing,
    cuisines: r.cuisines ?? [],
    dishTypes: r.dishTypes ?? [],
    diets: r.diets ?? [],
    vegetarian: Boolean(r.vegetarian),
    vegan: Boolean(r.vegan),
    glutenFree: Boolean(r.glutenFree),
    dairyFree: Boolean(r.dairyFree),
    veryHealthy: Boolean(r.veryHealthy),
    summary: r.summary ? cleanSummary(r.summary) : undefined,
    sourceUrl: r.sourceUrl,
    sourceName: r.sourceName,
    creditsText: r.creditsText,
    extendedIngredients: (
      r.extendedIngredients ?? ingredientsFromNutrition(r)
    )?.map(slimIngredient),
    analyzedInstructions: r.analyzedInstructions?.map((section) => ({
      name: section.name || undefined,
      steps: section.steps.map(({ number, step }) => ({ number, step })),
    })),
    nutrition: r.nutrition && {
      nutrients: r.nutrition.nutrients
        .filter((n) => KEPT_NUTRIENTS.has(n.name))
        .map(({ name, amount, unit, percentOfDailyNeeds }) => ({
          name,
          amount,
          unit,
          percentOfDailyNeeds,
        })),
    },
  };
}

function slimIngredient(i: Ingredient): Ingredient {
  return {
    id: i.id,
    name: i.name,
    original: i.original,
    amount: i.amount,
    unit: i.unit,
    measures: i.measures && {
      us: {
        amount: i.measures.us.amount,
        unitShort: i.measures.us.unitShort,
      },
      metric: {
        amount: i.measures.metric.amount,
        unitShort: i.measures.metric.unitShort,
      },
    },
  };
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

/**
 * Spoonacular summaries are HTML with links to other recipes. Strip them to plain
 * text and drop the trailing "you might also like..." promo sentences.
 */
export function cleanSummary(html: string): string {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? "")
    .replace(/\s+/g, " ")
    .trim();
  // Split on sentence ends only (not decimals like $1.06).
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .filter(
      (s) =>
        !/(you might also like|similar recipes|users who liked|if you like this recipe|spoonacular score|try\s.+\sfor similar)/i.test(
          s,
        ),
    )
    .join(" ")
    .trim();
}
