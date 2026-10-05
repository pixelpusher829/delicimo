import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ApiError } from "@/api/client";
import { recipeOptions } from "@/api/queries";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { addRecent } from "@/lib/recipeStore";
import { isCompleteRecipe } from "@/lib/recipe";
import type { Recipe as RecipeType } from "@/types";
import Ingredients from "./content/Ingredients";
import Instructions from "./content/Instructions";
import DietaryInfo from "./meta-labels/DietaryInfo";
import RecipeMeta from "./meta-labels/RecipeMeta";
import RecipeHeader from "./RecipeHeader";
import RecipeSkeleton from "./RecipeSkeleton";
import NutritionalInfo from "./sidebar/NutritionalInfo";
import SimilarRecipes from "./sidebar/SimilarRecipes";

const Recipe = () => {
  const id = Number(useParams().id);
  const queryClient = useQueryClient();
  const {
    data: recipe,
    error,
    isPending,
    refetch,
  } = useQuery(recipeOptions(id, queryClient));

  useEffect(() => {
    if (recipe && isCompleteRecipe(recipe)) addRecent(recipe);
  }, [recipe]);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    (error instanceof ApiError && error.status === 404)
  ) {
    return <RecipeNotFound />;
  }
  if (error) {
    return <ApiErrorMessage error={error} onRetry={() => refetch()} />;
  }
  if (isPending) return <RecipeSkeleton />;

  // Remount per recipe so local state (servings, checklists) resets.
  return <RecipeContent key={recipe.id} recipe={recipe} />;
};

const RecipeContent: React.FC<{ recipe: RecipeType }> = ({ recipe }) => {
  const [servings, setServings] = useState(recipe.servings || 1);
  const scale = recipe.servings ? servings / recipe.servings : 1;

  return (
    <article className="m-auto max-w-360 px-4 py-8 sm:px-6 sm:py-10">
      <title>{`${recipe.title} · Delicimo`}</title>
      {recipe.summary && (
        <meta name="description" content={recipe.summary.slice(0, 160)} />
      )}

      <RecipeHeader recipe={recipe} />

      <div className="my-8 flex flex-col gap-8 border-b border-neutral-100 pb-8 xl:flex-row xl:items-start xl:justify-between">
        <RecipeMeta
          recipe={recipe}
          servings={servings}
          onServingsChange={setServings}
        />
        <DietaryInfo recipe={recipe} />
      </div>

      {recipe.summary && (
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-neutral-700">
          {recipe.summary}
        </p>
      )}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 xl:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-12 lg:col-span-2 xl:col-span-7">
          <Ingredients
            recipeId={recipe.id}
            ingredients={recipe.extendedIngredients ?? []}
            scale={scale}
          />
          <Instructions
            recipeId={recipe.id}
            instructions={recipe.analyzedInstructions ?? []}
            sourceUrl={recipe.sourceUrl}
          />
        </div>
        <aside className="flex min-w-0 flex-col gap-10 lg:col-span-1 xl:col-span-4 xl:col-start-9">
          <NutritionalInfo nutrition={recipe.nutrition} />
          <SimilarRecipes recipe={recipe} />
        </aside>
      </div>
    </article>
  );
};

const RecipeNotFound = () => (
  <StatusMessage
    icon={SearchX}
    title="Recipe not found"
    action={
      <Button asChild>
        <Link to="/">Search recipes</Link>
      </Button>
    }
  >
    This recipe doesn't exist or is no longer available.
  </StatusMessage>
);

export default Recipe;
