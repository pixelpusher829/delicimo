import type { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

const GRID =
  "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4";

export const RecipeGrid: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => (
  <ul className={GRID}>
    {recipes.map((recipe, i) => (
      <li key={recipe.id} className="flex">
        <div className="w-full">
          <RecipeCard recipe={recipe} priority={i < 4} />
        </div>
      </li>
    ))}
  </ul>
);

export const RecipeGridSkeleton: React.FC<{ count?: number }> = ({
  count = 8,
}) => (
  <div className={GRID} aria-busy="true" aria-label="Loading recipes">
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200/70"
      >
        <div className="aspect-3/2 animate-pulse bg-neutral-200" />
        <div className="flex flex-col gap-3 p-4">
          <div className="h-3 w-1/4 animate-pulse rounded bg-neutral-200" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    ))}
  </div>
);
