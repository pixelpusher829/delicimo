import {
  Leaf,
  MilkOff,
  Salad,
  Zap,
  Wheat,
} from "lucide-react";
import type { Recipe } from "@/types";

interface DietaryInfoProps {
  recipe: Recipe;
}

const DietaryInfo: React.FC<DietaryInfoProps> = ({ recipe }) => {
  const dietaryFlags = [
    { label: "Vegetarian", value: recipe.vegetarian, icon: Salad },
    { label: "Vegan", value: recipe.vegan, icon: Leaf },
    { label: "Dairy Free", value: recipe.dairyFree, icon: MilkOff },
    { label: "Ketogenic", value: recipe.ketogenic, icon: Zap },
    { label: "Gluten Free", value: recipe.glutenFree, icon: Wheat },
  ];

  return (
      <div className="flex gap-16">
        <div className="pr-10">
          <h2 className="mb-3 text-2xl font-semibold">Dietary Information</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {dietaryFlags.map((flag) => (
              <div key={flag.label} className="flex items-center gap-2">
                <flag.icon
                  className={`h-5 w-5 ${
                    flag.value ? "text-neutral-700" : "text-neutral-300"
                  }`}
                />
                <span
                  className={`text-lg ${
                    flag.value ? "text-neutral-700" : "text-neutral-300"
                  }`}
                >
                  {flag.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default DietaryInfo;
