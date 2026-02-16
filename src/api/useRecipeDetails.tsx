import { useEffect, useState } from "react";

export function useRecipeDetails(id: number) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/mock/recipeDetails.json");
      const data = await response.json();
      const match = data.recipes.find((r: any) => r.id === id);
      setRecipe(match);
      setLoading(false);
    };

    load();
  }, [id]);

  return { recipe, loading };
}
