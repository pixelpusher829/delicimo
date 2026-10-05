import {
  Clock,
  DollarSign,
  Heart,
  HeartPulse,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { formatMinutes, formatPrice } from "@/lib/recipe";
import type { Recipe } from "@/types";

interface RecipeMetaProps {
  recipe: Recipe;
  servings: number;
  onServingsChange: (servings: number) => void;
}

const MAX_SERVINGS = 48;

const Stat: React.FC<{
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}> = ({ icon: Icon, label, children }) => (
  <div className="flex flex-col gap-1.5">
    <dt className="text-sm font-semibold tracking-wide text-neutral-500 uppercase">
      {label}
    </dt>
    <dd className="flex items-center gap-2 text-xl">
      <Icon aria-hidden className="size-5 text-leaf" />
      {children}
    </dd>
  </div>
);

const RecipeMeta: React.FC<RecipeMetaProps> = ({
  recipe,
  servings,
  onServingsChange,
}) => {
  const price = formatPrice(recipe.pricePerServing);
  const stepperClass =
    "flex size-8 items-center justify-center rounded-full border-2 border-neutral-200 hover:bg-neutral-50 disabled:opacity-40 print:hidden";

  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-6">
      <Stat icon={Users} label="Servings">
        <button
          type="button"
          className={stepperClass}
          onClick={() => onServingsChange(servings - 1)}
          disabled={servings <= 1}
          aria-label="Fewer servings"
        >
          <Minus className="size-4" />
        </button>
        <span className="min-w-6 text-center tabular-nums" aria-live="polite">
          {servings}
        </span>
        <button
          type="button"
          className={stepperClass}
          onClick={() => onServingsChange(servings + 1)}
          disabled={servings >= MAX_SERVINGS}
          aria-label="More servings"
        >
          <Plus className="size-4" />
        </button>
      </Stat>
      <Stat icon={Clock} label="Ready in">
        {formatMinutes(recipe.readyInMinutes)}
      </Stat>
      <Stat icon={HeartPulse} label="Health score">
        {Math.round(recipe.healthScore)}%
      </Stat>
      {recipe.aggregateLikes != null && recipe.aggregateLikes > 0 && (
        <Stat icon={Heart} label="Likes">
          {recipe.aggregateLikes.toLocaleString()}
        </Stat>
      )}
      {price && (
        <Stat icon={DollarSign} label="Per serving">
          {price}
        </Stat>
      )}
    </dl>
  );
};

export default RecipeMeta;
