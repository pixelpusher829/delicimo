import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecipeDetails } from "@/api/useRecipeDetails";
import type { Recipe as RecipeType } from "@/types";
import Ingredients from "./content/Ingredients";
import Instructions from "./content/Instructions";
import HealthInfo from "./meta-labels/HealthInfo";
import RecipeMeta from "./meta-labels/RecipeMeta";
import RecipeHeader from "./RecipeHeader";
import NutritionalInfo from "./sidebar/NutritionalInfo";
import SimilarRecipes from "./sidebar/SimilarRecipes";

interface RecipeProps {
  allRecipes: RecipeType[];
  isMock: boolean;
}

const Recipe: React.FC<RecipeProps> = ({ allRecipes, isMock }) => {
  const { id } = useParams();
  const { recipe, loading } = useRecipeDetails(Number(id), isMock);
  const [randomRecipes, setRandomRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    if (allRecipes && allRecipes.length > 0) {
      const filtered = allRecipes.filter((r) => r.id !== Number(id));
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      setRandomRecipes(shuffled.slice(0, 5));
    }
  }, [allRecipes, id]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!recipe) return <div className="p-20 text-center">Recipe not found.</div>;

  return (
    <div className="m-auto max-w-360 p-6 py-17">
      <RecipeHeader recipe={recipe} />
      <div className="my-8 grid grid-cols-3 border-b border-neutral-100 pb-10">
        <HealthInfo recipe={recipe} />
        <RecipeMeta
          readyInMinutes={recipe.readyInMinutes}
          servings={recipe.servings}
        />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-6 flex flex-col gap-10">
          <Ingredients ingredients={recipe.extendedIngredients || []} />
          <Instructions instructions={recipe.analyzedInstructions || []} />
        </div>
        <div className="col-span-4 col-start-9 flex flex-col gap-10">
          <NutritionalInfo nutrition={recipe.nutrition} />
          <SimilarRecipes recipes={randomRecipes} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
