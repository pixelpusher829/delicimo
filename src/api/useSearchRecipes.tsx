import { useEffect, useState } from "react";

export function useSearchRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/mock/searchResults.json");
      const data = await response.json();
      setRecipes(data.results);
      setLoading(false);
    };

    load();
  }, []);

  return { recipes, loading };
}
