import { useEffect, useState } from "react";
import type { Recipe } from "@/types";

const key = import.meta.env.VITE_API_SECRET_KEY;

export function useRecipeDetails(id: number, isMock: boolean) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const fetchMock = async () => {
        const response = await fetch("/mock/recipeDetails.json");
        const data = await response.json();
        const match = data.recipes.find((r: any) => r.id === id);
        setRecipe(match);
      };

      // If not using mock data, fetch from API. Otherwise, fetch mock data.
      if (!isMock) {
        try {
          const options = {
            method: "GET",
            headers: { "x-api-key": key },
          };
          const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`,
            options,
          );
          if (!response.ok) throw new Error("API Error");
          const data = await response.json();
          setRecipe(data);
        } catch (err) {
          console.error(err);
          await fetchMock();
        }
      } else {
        await fetchMock();
      }
      setLoading(false);
    };

    load();
  }, [id, isMock]);

  return { recipe, loading };
}
