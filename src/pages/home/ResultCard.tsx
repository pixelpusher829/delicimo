import { Link } from "react-router";
import Placeholder from "@/assets/placeholder.webp";
import type { Recipe } from "@/types";
import StarIcon from "~icons/fa7-solid/star";

interface ResultCardProps {
  recipe: Recipe;
}

const ResultCard: React.FC<ResultCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="overflow-hidden rounded-xl shadow-md outline-3 outline-transparent transition duration-200 hover:scale-102 hover:shadow-lg hover:outline-yellow-500">
        <img
          className="aspect-9/6 w-full object-cover"
          src={recipe.image || Placeholder}
          alt=""
        />
        <div className="bg-white p-4">
          <div className="flex pb-1">
            <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
            <StarIcon className="h-5 w-5 fill-current text-yellow-500" />
          </div>
          <span className="font-semibold">{recipe.title}</span>
          <div className="flex justify-between pt-3">
            <span className="text-neutral-600">
              {recipe.cuisines?.[0] || "General"}
            </span>
            <span className="text-neutral-600">{recipe.readyInMinutes} Mins</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
