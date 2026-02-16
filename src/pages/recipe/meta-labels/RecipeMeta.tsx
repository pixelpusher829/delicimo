import { Clock, Users } from "lucide-react";

interface RecipeMetaProps {
  readyInMinutes: number;
  servings: number;
}

const RecipeMeta: React.FC<RecipeMetaProps> = ({
  readyInMinutes,
  servings,
}) => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <h2 className="mb-3 text-2xl">Prep Time</h2>
        <div className="flex items-center">
          <Clock className="mr-2 inline" />
          <span className="text-xl">{readyInMinutes} mins</span>
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-2xl">Servings</h2>
        <div className="flex items-center">
          <Users className="mr-2 inline" />
          <span className="text-xl">{servings} People</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeMeta;
