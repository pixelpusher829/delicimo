import type { Recipe } from "@/types";

interface RecipeHeaderProps {
  recipe: Recipe;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe }) => {
  return (
    <div>
      <h1 className="text-5xl my-6">{recipe.title}</h1>
      <img
        className="aspect-21/9 object-cover rounded-3xl w-full"
        src={recipe.image}
        alt={recipe.title}
      />
    </div>
  );
};

export default RecipeHeader;
