// Small localStorage-backed recipe lists (saved and recently viewed). Recipes are
// stored in full so opening one later needs no API call. Exposed as an external
// store for useSyncExternalStore, and kept in sync across tabs.

import type { Recipe } from "@/types";

export type ListName = "favorites" | "recent";

const LIMITS: Record<ListName, number> = { favorites: 200, recent: 12 };
const PREFIX = "delicimo:list:";

const cache = new Map<ListName, Recipe[]>();
const listeners = new Set<() => void>();

export function getStoredRecipes(name: ListName): Recipe[] {
  let list = cache.get(name);
  if (!list) {
    try {
      const raw = localStorage.getItem(PREFIX + name);
      list = raw ? (JSON.parse(raw) as Recipe[]) : [];
    } catch {
      list = [];
    }
    cache.set(name, list);
  }
  return list;
}

function setStoredRecipes(name: ListName, list: Recipe[]) {
  const trimmed = list.slice(0, LIMITS[name]);
  cache.set(name, trimmed);
  try {
    localStorage.setItem(PREFIX + name, JSON.stringify(trimmed));
  } catch {
    // Storage full or unavailable (private mode): keep the in-memory copy.
  }
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key.startsWith(PREFIX)) {
      cache.clear();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function isFavorite(id: number): boolean {
  return getStoredRecipes("favorites").some((r) => r.id === id);
}

export function toggleFavorite(recipe: Recipe) {
  const list = getStoredRecipes("favorites");
  setStoredRecipes(
    "favorites",
    isFavorite(recipe.id)
      ? list.filter((r) => r.id !== recipe.id)
      : [recipe, ...list],
  );
}

export function addRecent(recipe: Recipe) {
  const list = getStoredRecipes("recent");
  if (list[0]?.id === recipe.id) return;
  setStoredRecipes("recent", [
    recipe,
    ...list.filter((r) => r.id !== recipe.id),
  ]);
}

export function clearList(name: ListName) {
  setStoredRecipes(name, []);
}
