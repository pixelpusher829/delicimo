import Ingredients from "./content/Ingredients";
import Instructions from "./content/Instructions";
import HealthInfo from "./meta-labels/HealthInfo";
import RecipeMeta from "./meta-labels/RecipeMeta";
import RecipeHeader from "./RecipeHeader";
import Banner from "./sidebar/Banner";
import NutritionalInfo from "./sidebar/NutritionalInfo";
import SimilarRecipes from "./sidebar/SimilarRecipes";

const Recipe: React.FC = () => {
  return (
    <div className="m-auto max-w-360 p-6 pt-17">
      <RecipeHeader />
      <div className="my-8 grid grid-cols-3 border-b border-neutral-100 pb-10">
        <HealthInfo />
        <RecipeMeta />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-7 flex flex-col gap-10">
          <Ingredients />
          <Instructions />
        </div>
        <div className="col-span-4 col-start-9 flex flex-col gap-14">
          <NutritionalInfo />
          <SimilarRecipes />
          <Banner />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
