import { useSyncExternalStore } from "react";
import {
  getStoredRecipes,
  isFavorite,
  subscribe,
  type ListName,
} from "@/lib/recipeStore";
import type { Recipe } from "@/types";

const EMPTY: Recipe[] = [];

export function useRecipeList(name: ListName): Recipe[] {
  return useSyncExternalStore(
    subscribe,
    () => getStoredRecipes(name),
    () => EMPTY,
  );
}

export function useIsFavorite(id: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isFavorite(id),
    () => false,
  );
}
