import { useState } from "react";
import { Circle, CheckCircle2 } from "lucide-react";

interface IngredientsProps {
  ingredients: any[];
}

const Ingredients: React.FC<IngredientsProps> = ({ ingredients }) => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  const toggleIngredient = (id: number) => {
    const newCheckedIds = new Set(checkedIds);
    if (newCheckedIds.has(id)) {
      newCheckedIds.delete(id);
    } else {
      newCheckedIds.add(id);
    }
    setCheckedIds(newCheckedIds);
  };

  return (
    <div className="border-b border-neutral-100 pb-10">
      <h2 className="mb-4 text-3xl">Ingredients</h2>
      <ul className="flex flex-col gap-4">
        {ingredients?.map((ingredient) => {
          const isChecked = checkedIds.has(ingredient.id);
          return (
            <li
              key={ingredient.id}
              className="flex cursor-pointer items-center gap-4 text-xl transition-colors hover:text-neutral-600"
              onClick={() => toggleIngredient(ingredient.id)}
            >
              {isChecked ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6 text-neutral-400" />
              )}
              <span
                className={`transition-all ${
                  isChecked ? "text-neutral-400 line-through" : ""
                }`}
              >
                <span className="font-bold">
                  {ingredient.amount} {ingredient.unit}
                </span>
                &nbsp;{ingredient.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ingredients;
