import { Check, ClipboardCopy } from "lucide-react";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ingredientQuantity, type UnitSystem } from "@/lib/recipe";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/types";

interface IngredientsProps {
  recipeId: number;
  ingredients: Ingredient[];
  scale: number;
}

const Ingredients: React.FC<IngredientsProps> = ({
  recipeId,
  ingredients,
  scale,
}) => {
  const [system, setSystem] = useLocalStorage<UnitSystem>(
    "delicimo:units",
    "us",
  );
  // Indices, since Spoonacular sometimes lists the same ingredient id twice.
  const [checked, setChecked] = useLocalStorage<number[]>(
    `delicimo:ingredients:${recipeId}`,
    [],
  );
  const [copied, setCopied] = useState(false);
  const hasMeasures = ingredients.some((i) => i.measures);

  const lines = ingredients.map((ingredient) => {
    const { amount, unit } = ingredientQuantity(ingredient, system, scale);
    return { ingredient, quantity: [amount, unit].filter(Boolean).join(" ") };
  });

  const toggle = (index: number) =>
    setChecked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );

  const copyList = async () => {
    const text = lines
      .filter((_, i) => !checked.includes(i))
      .map(
        ({ ingredient, quantity }) =>
          `- ${[quantity, ingredient.name].filter(Boolean).join(" ")}`,
      )
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section aria-labelledby="ingredients-heading">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 id="ingredients-heading" className="text-3xl">
          Ingredients
        </h2>
        <div className="flex items-center gap-2 print:hidden">
          {hasMeasures && (
            <div
              role="radiogroup"
              aria-label="Units"
              className="flex rounded-full bg-neutral-100 p-1 text-sm font-semibold"
            >
              {(["us", "metric"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={system === s}
                  onClick={() => setSystem(s)}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    system === s
                      ? "bg-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900",
                  )}
                >
                  {s === "us" ? "US" : "Metric"}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={copyList}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
            title="Copy the ingredients you haven't checked off"
          >
            {copied ? (
              <Check aria-hidden className="size-4" />
            ) : (
              <ClipboardCopy aria-hidden className="size-4" />
            )}
            <span aria-live="polite">
              {copied ? "Copied" : "Copy shopping list"}
            </span>
          </button>
        </div>
      </div>

      <ul className="flex flex-col">
        {lines.map(({ ingredient, quantity }, index) => {
          const isChecked = checked.includes(index);
          return (
            <li
              key={index}
              className="border-b border-neutral-100 last:border-0"
            >
              <label className="flex cursor-pointer items-start gap-4 py-3 text-lg">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(index)}
                  className="mt-1 size-5 shrink-0 cursor-pointer accent-leaf"
                />
                <span
                  className={cn(
                    "transition-colors",
                    isChecked && "text-neutral-400 line-through",
                  )}
                >
                  {quantity && (
                    <span className="font-semibold">{quantity} </span>
                  )}
                  {ingredient.name}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Ingredients;
