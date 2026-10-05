import { searchRecipes, spoonacularUpstream } from "../_lib/spoonacular.js";

// GET /api/recipes/search?q=pasta&offset=0
export function GET(request: Request) {
  const key = process.env.SPOONACULAR_API_KEY;
  return searchRecipes(
    new URL(request.url),
    key ? spoonacularUpstream(key) : undefined,
  );
}
