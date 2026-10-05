import { Bookmark } from "lucide-react";
import { useIsFavorite } from "@/hooks/useRecipeList";
import { toggleFavorite } from "@/lib/recipeStore";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/types";

interface FavoriteButtonProps {
  recipe: Recipe;
  variant?: "overlay" | "button";
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipe,
  variant = "overlay",
  className,
}) => {
  const saved = useIsFavorite(recipe.id);
  const label = saved
    ? `Remove ${recipe.title} from saved`
    : `Save ${recipe.title}`;

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={variant === "overlay" ? label : undefined}
      title={label}
      onClick={(e) => {
        // Cards are links; don't navigate when toggling.
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipe);
      }}
      className={cn(
        "flex items-center justify-center gap-2 transition-colors",
        variant === "overlay"
          ? "size-10 rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur hover:bg-white"
          : "rounded-full border-2 border-neutral-200 px-4 py-2 font-semibold hover:border-neutral-300 hover:bg-neutral-50",
        className,
      )}
    >
      <Bookmark
        aria-hidden
        className={cn("size-5", saved && "fill-brand text-brand-dark")}
      />
      {variant === "button" && <span>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
};

export default FavoriteButton;
