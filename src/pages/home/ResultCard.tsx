import { Link } from "react-router";
import Placeholder from "@/assets/placeholder.webp";
import StarIcon from "~icons/fa7-solid/star";

const ResultCard: React.FC = () => {
  return (
    <Link to="/recipe/seafood-noodles">
      <div className="overflow-hidden rounded-xl shadow-md outline-3 outline-transparent transition duration-200 hover:scale-102 hover:shadow-lg hover:outline-yellow-500">
        <img
          className="aspect-9/6 w-full object-cover"
          src={Placeholder}
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
          <span className="font-semibold">Seafood Noodles</span>
          <div className="flex justify-between pt-3">
            <span className="text-neutral-600">Seafood</span>
            <span className="text-neutral-600">30 Mins</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
