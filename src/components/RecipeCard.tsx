import { Clock, Heart, Leaf } from "lucide-react";
import { Link } from "react-router";
import Placeholder from "@/assets/placeholder.webp";
import { formatMinutes, recipeCategory, recipeImage } from "@/lib/recipe";
import type { Recipe } from "@/types";
import FavoriteButton from "./FavoriteButton";

interface RecipeCardProps {
  recipe: Recipe;
  /** Load eagerly for cards likely to be above the fold. */
  priority?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, priority }) => {
  const category = recipeCategory(recipe);
  const diet = recipe.vegan
    ? "Vegan"
    : recipe.vegetarian
      ? "Vegetarian"
      : undefined;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70 transition duration-200 focus-within:ring-2 focus-within:ring-brand hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-3/2 overflow-hidden bg-neutral-100">
        <img
          src={recipeImage(recipe.image, "480x360") ?? Placeholder}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = Placeholder;
          }}
          className="size-full object-cover transition duration-300 group-hover:scale-105"
        />
        {diet && (
          <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-leaf backdrop-blur">
            <Leaf aria-hidden className="size-3.5" />
            {diet}
          </span>
        )}
        <FavoriteButton
          recipe={recipe}
          className="absolute top-2 right-2 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {category && (
          <span className="text-xs font-semibold tracking-wide text-brand-dark uppercase">
            {category}
          </span>
        )}
        <h3 className="line-clamp-2 font-sans text-lg leading-snug font-semibold text-neutral-900">
          {/* Stretched link: the whole card is clickable. */}
          <Link
            to={`/recipe/${recipe.id}`}
            className="outline-none after:absolute after:inset-0"
          >
            {recipe.title}
          </Link>
        </h3>
        <div className="mt-auto flex items-center gap-4 pt-1 text-sm text-neutral-600">
          <span className="flex items-center gap-1.5">
            <Clock aria-hidden className="size-4" />
            {formatMinutes(recipe.readyInMinutes)}
          </span>
          {recipe.aggregateLikes != null && recipe.aggregateLikes > 0 && (
            <span className="flex items-center gap-1.5">
              <Heart aria-hidden className="size-4" />
              <span>
                {recipe.aggregateLikes.toLocaleString()}
                <span className="sr-only"> likes</span>
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
