import type { Recipe } from "@/types";

export const DIETS = [
  {
    value: "vegetarian",
    label: "Vegetarian",
    test: (r: Recipe) => r.vegetarian,
  },
  { value: "vegan", label: "Vegan", test: (r: Recipe) => r.vegan },
  {
    value: "gluten-free",
    label: "Gluten free",
    test: (r: Recipe) => r.glutenFree,
  },
  {
    value: "dairy-free",
    label: "Dairy free",
    test: (r: Recipe) => r.dairyFree,
  },
] as const;

export type Diet = (typeof DIETS)[number]["value"];

export const SORTS = [
  { value: "relevance", label: "Most relevant" },
  { value: "quickest", label: "Quickest" },
  { value: "healthiest", label: "Healthiest" },
  { value: "popular", label: "Most popular" },
] as const;

export type Sort = (typeof SORTS)[number]["value"];

export const MAX_TIMES = [15, 30, 45, 60] as const;

export interface Filters {
  q: string;
  cuisine: string | null;
  diets: Diet[];
  maxTime: number | null;
  sort: Sort;
}

const isDiet = (v: string): v is Diet => DIETS.some((d) => d.value === v);
const isSort = (v: string): v is Sort => SORTS.some((s) => s.value === v);

export function parseFilters(params: URLSearchParams): Filters {
  const time = Number(params.get("time"));
  const sort = params.get("sort") ?? "";
  return {
    q: params.get("q") ?? "",
    cuisine: params.get("cuisine") || null,
    diets: (params.get("diet") ?? "").split(",").filter(isDiet),
    maxTime: time > 0 ? time : null,
    sort: isSort(sort) ? sort : "relevance",
  };
}

export function serializeFilters(f: Filters): URLSearchParams {
  const params = new URLSearchParams();
  if (f.q.trim()) params.set("q", f.q.trim());
  if (f.cuisine) params.set("cuisine", f.cuisine);
  if (f.diets.length) params.set("diet", f.diets.join(","));
  if (f.maxTime) params.set("time", String(f.maxTime));
  if (f.sort !== "relevance") params.set("sort", f.sort);
  return params;
}

export const NO_FILTERS = {
  cuisine: null,
  diets: [],
  maxTime: null,
  sort: "relevance",
} satisfies Omit<Filters, "q">;

export function hasActiveFilters(f: Filters): boolean {
  return Boolean(
    f.cuisine || f.diets.length || f.maxTime || f.sort !== "relevance",
  );
}

/** Filtering and sorting run on already-loaded results, so they cost no quota. */
export function applyFilters(recipes: Recipe[], f: Filters): Recipe[] {
  const diets = DIETS.filter((d) => f.diets.includes(d.value));
  const filtered = recipes.filter(
    (r) =>
      (!f.cuisine || r.cuisines.includes(f.cuisine)) &&
      (!f.maxTime || r.readyInMinutes <= f.maxTime) &&
      diets.every((d) => d.test(r)),
  );

  switch (f.sort) {
    case "quickest":
      return filtered.toSorted((a, b) => a.readyInMinutes - b.readyInMinutes);
    case "healthiest":
      return filtered.toSorted((a, b) => b.healthScore - a.healthScore);
    case "popular":
      return filtered.toSorted(
        (a, b) => (b.aggregateLikes ?? 0) - (a.aggregateLikes ?? 0),
      );
    default:
      return filtered;
  }
}

export function getCuisines(recipes: Recipe[]): string[] {
  return [...new Set(recipes.flatMap((r) => r.cuisines))].sort();
}
