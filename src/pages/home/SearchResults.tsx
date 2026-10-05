import { useInfiniteQuery } from "@tanstack/react-query";
import { Info, Loader2, SearchX, SlidersHorizontal } from "lucide-react";
import { searchOptions } from "@/api/queries";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { RecipeGrid, RecipeGridSkeleton } from "@/components/RecipeGrid";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { applyFilters, getCuisines, hasActiveFilters } from "@/lib/filters";
import FilterBar from "./FilterBar";

const SearchResults: React.FC<{ query: string }> = ({ query }) => {
  const { filters, update, clear } = useSearchFilters();
  const {
    data,
    error,
    isPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(searchOptions(query));

  const loaded = data?.pages.flatMap((p) => p.results) ?? [];
  // Spoonacular can repeat a recipe across pages; keep the first occurrence.
  const recipes = loaded.filter(
    (r, i) => loaded.findIndex((x) => x.id === r.id) === i,
  );
  const visible = applyFilters(recipes, filters);
  const total = data?.pages[0]?.totalResults ?? 0;
  const filtering = hasActiveFilters(filters);
  const fallback = data?.pages[0]?.fallback;

  return (
    <section
      aria-labelledby="results-heading"
      className="min-h-[60vh] bg-neutral-50"
    >
      <div className="m-auto flex max-w-360 flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-1">
          <h1 id="results-heading" className="text-3xl">
            Recipes for “{query}”
          </h1>
          {data && (
            <p className="text-neutral-600" aria-live="polite">
              {filtering
                ? `${visible.length} of ${recipes.length} loaded recipes match your filters`
                : fallback
                  ? `Showing ${recipes.length} sample recipes`
                  : `Showing ${recipes.length} of ${total.toLocaleString()} recipes`}
            </p>
          )}
        </div>

        {fallback && (
          <div
            role="status"
            className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-200"
          >
            <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
            <p>
              <span className="font-semibold">
                Live search is resting for today.
              </span>{" "}
              {fallback.matched
                ? `Here are sample recipes matching “${query}” instead.`
                : `We don't have samples for “${query}”, so here are some popular picks.`}{" "}
              Full search is back once the daily limit resets.
            </p>
          </div>
        )}

        {recipes.length > 0 && (
          <FilterBar
            filters={filters}
            cuisines={getCuisines(recipes)}
            onChange={update}
            onClear={clear}
          />
        )}

        {isPending ? (
          <RecipeGridSkeleton />
        ) : error && !data ? (
          <ApiErrorMessage error={error} onRetry={() => refetch()} />
        ) : recipes.length === 0 ? (
          <StatusMessage icon={SearchX} title="No recipes found">
            Try a different or more general search, like a main ingredient or
            dish name.
          </StatusMessage>
        ) : visible.length === 0 ? (
          <StatusMessage
            icon={SlidersHorizontal}
            title="No matches for these filters"
            action={
              <Button variant="outline" onClick={clear}>
                Clear filters
              </Button>
            }
          >
            {hasNextPage
              ? "Clear some filters, or load more results to find a match."
              : "Try clearing some filters."}
          </StatusMessage>
        ) : (
          <RecipeGrid recipes={visible} />
        )}

        {/* A failed "load more" keeps the loaded results and shows the error below. */}
        {error && data && <ApiErrorMessage error={error} />}

        {hasNextPage && !error && (
          <div className="flex flex-col items-center gap-2 pt-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="min-w-48 rounded-full"
            >
              {isFetchingNextPage && (
                <Loader2 aria-hidden className="animate-spin" />
              )}
              {isFetchingNextPage ? "Loading…" : "Load more recipes"}
            </Button>
            <span className="text-sm text-neutral-500">
              {(total - recipes.length).toLocaleString()} more available
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
