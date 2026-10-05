import { Check, Leaf, MilkOff, Salad, Sparkles, WheatOff } from "lucide-react";
import type { Recipe } from "@/types";

const DietaryInfo: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const isKeto = recipe.diets?.some((d) => d.includes("ketogenic"));
  const flags = [
    { label: "Vegetarian", value: recipe.vegetarian, icon: Salad },
    { label: "Vegan", value: recipe.vegan, icon: Leaf },
    { label: "Gluten free", value: recipe.glutenFree, icon: WheatOff },
    { label: "Dairy free", value: recipe.dairyFree, icon: MilkOff },
    { label: "Ketogenic", value: isKeto, icon: Check },
    { label: "Very healthy", value: recipe.veryHealthy, icon: Sparkles },
  ].filter((f) => f.value);

  if (flags.length === 0) return null;

  return (
    <div>
      <h2 className="sr-only">Dietary information</h2>
      <ul className="flex flex-wrap gap-2">
        {flags.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className="flex items-center gap-1.5 rounded-full bg-leaf/10 px-3 py-1.5 text-sm font-semibold text-leaf"
          >
            <Icon aria-hidden className="size-4" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DietaryInfo;
