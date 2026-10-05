import {
  infiniteQueryOptions,
  queryOptions,
  type InfiniteData,
  type QueryClient,
} from "@tanstack/react-query";
import { normalizeQuery } from "@/lib/query";
import { isCompleteRecipe } from "@/lib/recipe";
import { getStoredRecipes } from "@/lib/recipeStore";
import type { Recipe, SearchResponse } from "@/types";
import { apiFetch } from "./client";
import {
  fallbackRecipe,
  fallbackSearch,
  isFallbackData,
  shouldUseFallback,
} from "./fallback";

export const queryKeys = {
  search: (q: string) => ["search", normalizeQuery(q)] as const,
  recipe: (id: number) => ["recipe", id] as const,
};

export function searchOptions(q: string) {
  const query = normalizeQuery(q);
  return infiniteQueryOptions({
    queryKey: queryKeys.search(query),
    queryFn: async ({ pageParam }) => {
      try {
        return await apiFetch<SearchResponse>(
          `/api/recipes/search?q=${encodeURIComponent(query)}&offset=${pageParam}`,
        );
      } catch (error) {
        // A failed first page shows sample recipes instead. A failed "load
        // more" keeps the live results already loaded and shows the error.
        if (pageParam === 0 && shouldUseFallback(error)) {
          return fallbackSearch(query);
        }
        throw error;
      }
    },
    // Live results never go stale. Sample results are retried on the next visit,
    // so real results return once the quota resets.
    staleTime: ({ state }) => (isFallbackData(state.data) ? 0 : Infinity),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const next = last.offset + last.number;
      return last.results.length > 0 && next < last.totalResults
        ? next
        : undefined;
    },
    enabled: query.length > 0,
  });
}

export function recipeOptions(id: number, queryClient: QueryClient) {
  return queryOptions({
    queryKey: queryKeys.recipe(id),
    queryFn: async () => {
      try {
        return await apiFetch<Recipe>(`/api/recipes/${id}`);
      } catch (error) {
        // Sample recipes are real Spoonacular recipes, so a link to one still works.
        const sample = shouldUseFallback(error) && (await fallbackRecipe(id));
        if (sample) return sample;
        throw error;
      }
    },
    // Search results already include full details, so a recipe opened from a
    // search (or from saved / recently viewed) renders without any API call.
    initialData: () => findCachedRecipe(queryClient, id),
    enabled: Number.isInteger(id) && id > 0,
  });
}

/** Every recipe in the loaded search results, de-duplicated. */
export function getCachedSearchRecipes(queryClient: QueryClient): Recipe[] {
  const byId = new Map<number, Recipe>();
  const searches = queryClient.getQueriesData<InfiniteData<SearchResponse>>({
    queryKey: ["search"],
  });
  for (const [, data] of searches) {
    for (const page of data?.pages ?? []) {
      for (const recipe of page.results) byId.set(recipe.id, recipe);
    }
  }
  return [...byId.values()];
}

export function findCachedRecipe(
  queryClient: QueryClient,
  id: number,
): Recipe | undefined {
  const candidates = [
    ...getCachedSearchRecipes(queryClient),
    ...getStoredRecipes("favorites"),
    ...getStoredRecipes("recent"),
  ];
  return candidates.find((r) => r.id === id && isCompleteRecipe(r));
}
