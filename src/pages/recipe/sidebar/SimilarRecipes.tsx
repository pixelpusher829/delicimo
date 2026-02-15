import recipeImage from "@/assets/placeholder.webp";
import StarIcon from "~icons/fa7-solid/star";

const SimilarRecipes: React.FC = () => {
  return (
    <div>
      <h2 className="mb-6 text-3xl">Similar Recipes</h2>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <img
            className="aspect-5/4 max-w-30 rounded-lg object-cover"
            src={recipeImage}
            alt="Similar recipe"
          />
          <div className="flex flex-col justify-center">
            <div className="flex pb-1">
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            </div>
            <span className="text-xl font-semibold">Seafood Noodles</span>
          </div>
        </div>
        <div className="flex gap-4">
          <img
            className="aspect-5/4 max-w-30 rounded-lg object-cover"
            src={recipeImage}
            alt="Similar recipe"
          />
          <div className="flex flex-col justify-center">
            <div className="flex pb-1">
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            </div>
            <span className="text-xl font-semibold">Seafood Noodles</span>
          </div>
        </div>
        <div className="flex gap-4">
          <img
            className="aspect-5/4 max-w-30 rounded-lg object-cover"
            src={recipeImage}
            alt="Similar recipe"
          />
          <div className="flex flex-col justify-center">
            <div className="flex pb-1">
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            </div>
            <span className="text-xl font-semibold">Seafood Noodles</span>
          </div>
        </div>
        <div className="flex gap-4">
          <img
            className="aspect-5/4 max-w-30 rounded-lg object-cover"
            src={recipeImage}
            alt="Similar recipe"
          />
          <div className="flex flex-col justify-center">
            <div className="flex pb-1">
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            </div>
            <span className="text-xl font-semibold">Seafood Noodles</span>
          </div>
        </div>
        <div className="flex gap-4">
          <img
            className="aspect-5/4 max-w-30 rounded-lg object-cover"
            src={recipeImage}
            alt="Similar recipe"
          />
          <div className="flex flex-col justify-center">
            <div className="flex pb-1">
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
              <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            </div>
            <span className="text-xl font-semibold">Seafood Noodles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarRecipes;
