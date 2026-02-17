import { useParams } from "react-router";
import { useRecipeDetails } from "@/api/useRecipeDetails";
import type { Recipe as RecipeType } from "@/types";
import Ingredients from "./content/Ingredients";
import Instructions from "./content/Instructions";
import RecipeMeta from "./meta-labels/RecipeMeta";
import RecipeHeader from "./RecipeHeader";
import NutritionalInfo from "./sidebar/NutritionalInfo";
import SimilarRecipes from "./sidebar/SimilarRecipes";
import DietaryInfo from "./meta-labels/DietaryInfo";

interface RecipeProps {
  allRecipes: RecipeType[];
  isMock: boolean;
}

const Recipe: React.FC<RecipeProps> = ({ allRecipes, isMock }) => {
  const { id } = useParams();
  const { recipe, loading } = useRecipeDetails(Number(id), isMock);

  let randomRecipes: RecipeType[] = [];
  if (allRecipes && allRecipes.length > 0) {
    const filtered = allRecipes.filter((r) => r.id !== Number(id));
    // eslint-disable-next-line react-hooks/purity
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    randomRecipes = shuffled.slice(0, 5);
  }

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!recipe) return <div className="p-20 text-center">Recipe not found.</div>;

  return (
    <div className="m-auto max-w-360 p-6 py-17">
      <RecipeHeader recipe={recipe} />
      <div className="my-8 flex flex-col justify-between gap-10 border-b border-neutral-100 pb-10 lg:flex-row">
        <RecipeMeta recipe={recipe} />
        <DietaryInfo recipe={recipe} />
      </div>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-3 xl:grid-cols-12">
        <div className="col-span-1 flex max-w-160 flex-col gap-10 lg:col-span-2 xl:col-span-6">
          <Ingredients ingredients={recipe.extendedIngredients || []} />
          <Instructions instructions={recipe.analyzedInstructions || []} />
        </div>
        <div className="col-span-1 flex max-w-160 flex-col gap-10 lg:col-span-1 xl:col-span-4 xl:col-start-9">
          <NutritionalInfo nutrition={recipe.nutrition} />
          <SimilarRecipes recipes={randomRecipes} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
