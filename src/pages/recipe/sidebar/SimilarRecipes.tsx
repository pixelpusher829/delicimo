import { useQueryClient } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { Link } from "react-router";
import Placeholder from "@/assets/placeholder.webp";
import { getCachedSearchRecipes } from "@/api/queries";
import { formatMinutes, recipeImage } from "@/lib/recipe";
import type { Recipe } from "@/types";

/** How alike two recipes are, by shared cuisines, dish types and diets. */
function similarity(a: Recipe, b: Recipe): number {
  const overlap = (x: string[] = [], y: string[] = []) =>
    x.filter((v) => y.includes(v)).length;
  return (
    overlap(a.cuisines, b.cuisines) * 3 +
    overlap(a.dishTypes, b.dishTypes) * 2 +
    overlap(a.diets, b.diets)
  );
}

/**
 * Suggestions come from already-loaded search results rather than Spoonacular's
 * /similar endpoint, so they cost no API quota. Hidden when nothing is cached.
 */
const SimilarRecipes: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const queryClient = useQueryClient();
  const suggestions = getCachedSearchRecipes(queryClient)
    .filter((r) => r.id !== recipe.id)
    .map((r) => ({ r, score: similarity(recipe, r) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.r.aggregateLikes ?? 0) - (a.r.aggregateLikes ?? 0),
    )
    .slice(0, 4)
    .map(({ r }) => r);

  if (suggestions.length === 0) return null;

  return (
    <section aria-labelledby="similar-heading" className="print:hidden">
      <h2 id="similar-heading" className="mb-5 text-3xl">
        You might also like
      </h2>
      <ul className="flex flex-col gap-4">
        {suggestions.map((r) => (
          <li key={r.id}>
            <Link
              to={`/recipe/${r.id}`}
              className="group flex items-center gap-4 rounded-xl p-1 transition-colors hover:bg-neutral-50"
            >
              <img
                className="aspect-5/4 w-28 shrink-0 rounded-lg bg-neutral-100 object-cover"
                src={recipeImage(r.image, "312x231") ?? Placeholder}
                alt=""
                loading="lazy"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <span className="line-clamp-2 text-lg leading-snug font-semibold group-hover:underline">
                  {r.title}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-neutral-600">
                  <Clock aria-hidden className="size-4" />
                  {formatMinutes(r.readyInMinutes)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SimilarRecipes;
