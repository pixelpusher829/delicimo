import type { Recipe } from "@/types";
import { Clock, Heart, Users } from "lucide-react";

interface RecipeMetaProps {
  recipe: Recipe;
}

const RecipeMeta: React.FC<RecipeMetaProps> = ({
  recipe
}) => {
  return (
    <div className="flex shrink-0 flex-row gap-10 md:gap-12">
      <div className="col-span-2">
        <h2 className="mb-3 text-xl md:text-2xl">Servings</h2>
        <div className="flex items-center gap-3">
          <Users className="inline" />
          <span className="text-xl">{recipe.servings} People</span>
        </div>
      </div>

      <div className="col-span-2">
        <h2 className="mb-3 text-xl md:text-2xl">Prep Time</h2>
        <div className="flex items-center gap-3">
          <Clock className="inline" />
          <span className="text-xl">{recipe.readyInMinutes} mins</span>
        </div>
      </div>
      <div className="col-span-2">
        <h2 className="mb-3 text-xl font-semibold md:text-2xl">Health Score</h2>
        <div className="flex items-center gap-3">
          <Heart className="inline" />
          <span className="text-xl">{Math.round(recipe.healthScore)}%</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeMeta;
