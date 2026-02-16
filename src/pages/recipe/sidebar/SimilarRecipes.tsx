import { Link } from "react-router";
import StarIcon from "~icons/fa7-solid/star";

interface SimilarRecipesProps {
  recipes: any[];
}

const SimilarRecipes: React.FC<SimilarRecipesProps> = ({ recipes }) => {
  return (
    <div>
      <h2 className="mb-6 text-3xl">Similar Recipes</h2>
      <div className="flex flex-col gap-6">
        {recipes?.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="flex gap-4 transition-opacity hover:opacity-80"
          >
            <img
              className="aspect-5/4 max-w-30 rounded-lg object-cover"
              src={recipe.image}
              alt={recipe.title}
            />
            <div className="flex flex-col justify-center">
              <div className="flex pb-1">
                <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
                <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
                <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
                <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
                <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <span className="text-xl font-semibold">{recipe.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarRecipes;
