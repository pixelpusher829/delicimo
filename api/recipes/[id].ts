import { getRecipe, spoonacularUpstream } from "../_lib/spoonacular.js";

// GET /api/recipes/:id (only hit when a recipe isn't already cached client-side,
// e.g. a shared link opened in a fresh browser)
export function GET(request: Request) {
  const key = process.env.SPOONACULAR_API_KEY;
  const id = new URL(request.url).pathname.split("/").pop() ?? "";
  return getRecipe(id, key ? spoonacularUpstream(key) : undefined);
}
