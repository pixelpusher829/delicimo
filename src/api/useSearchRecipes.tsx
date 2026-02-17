const key = import.meta.env.VITE_API_SECRET_KEY;

//This variable is a manual override to prevent API calls during development. Set to true to enable API calls, false to use mock data.
//The Spoonacular API has a very limited free tier with a daily quota, so this allows development without worrying about hitting that limit.
const apiActive = true;

// Number of results to fetch per search. Adjust as needed, but keep in mind the API's rate limits and response times.
const resultsPerSearch = 25;

import { useEffect, useState } from "react";

export function useSearchRecipes(
  searchTerm: string,
  setIsMock: (isMock: boolean) => void,
) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const fetchMock = async () => {
        const response = await fetch("/mock/searchResults.json");
        const data = await response.json();
        setRecipes(data.results);
      };

      // If API is active and search term is provided, fetch from API. Otherwise, fetch mock data.
      if (apiActive && searchTerm) {
        try {
          const options = {
            method: "GET",
            headers: {
              "x-api-key": key,
            },
          };
          const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=${resultsPerSearch}&addRecipeInformation=true`,
            options,
          );
          if (!response.ok) throw new Error("API Error");
          const data = await response.json();
          setRecipes(data.results);
          setIsMock(false);

        // If API call fails due to error or depleted quota, fallback to mock data
        } catch (err) {
          console.error(err);
          await fetchMock();
          setIsMock(true);
        }
      } else {
        await fetchMock();
        if (searchTerm) {
          setIsMock(true);
        }
      }
      setLoading(false);
    };

    load();
  }, [searchTerm, setIsMock]);

  return { recipes, loading };
}
