import { Clock, Users } from "lucide-react";

const RecipeMeta: React.FC = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <h2 className="mb-3 text-2xl">Prep Time</h2>
        <div className="flex items-center">
          <Clock className="mr-2 inline" />
          <span className="text-xl">30 mins</span>
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-2xl">Servings</h2>
        <div className="flex items-center">
          <Users className="mr-2 inline" /> 
          <span className="text-xl">2 People</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeMeta;
