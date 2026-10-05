import { searchFallback, type FallbackData } from "@/lib/fallback";
import type { Recipe, SearchResponse } from "@/types";
import { ApiError } from "./client";

// Loaded on demand (separate chunk), so it costs nothing until live search fails.
let data: Promise<FallbackData> | undefined;
const loadFallback = () =>
  (data ??= import("@/data/fallback-recipes.json").then(
    (m) => m.default as FallbackData,
  ));

/**
 * Fall back to sample recipes for anything except a bad request or a genuine
 * "not found". That covers the quota running out, rate limits, outages and
 * offline use, so the demo always shows something.
 */
export function shouldUseFallback(error: unknown): boolean {
  return (
    error instanceof ApiError && error.status !== 400 && error.status !== 404
  );
}

export async function fallbackSearch(query: string): Promise<SearchResponse> {
  const { recipes, matched } = searchFallback(await loadFallback(), query);
  return {
    results: recipes,
    offset: 0,
    number: recipes.length,
    totalResults: recipes.length,
    fallback: { matched },
  };
}

export async function fallbackRecipe(id: number): Promise<Recipe | undefined> {
  return (await loadFallback()).recipes.find((r) => r.id === id);
}

export function isFallbackData(data: unknown): boolean {
  const pages = (data as { pages?: SearchResponse[] } | undefined)?.pages;
  return Boolean(pages?.[0]?.fallback);
}
