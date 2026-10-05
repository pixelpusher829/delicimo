import { Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DIETS,
  hasActiveFilters,
  MAX_TIMES,
  SORTS,
  type Filters,
  type Sort,
} from "@/lib/filters";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: Filters;
  cuisines: string[];
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
}

const ANY = "any";

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  cuisines,
  onChange,
  onClear,
}) => {
  // Keep a cuisine from the URL selectable even if the loaded results don't include it.
  const cuisineOptions =
    filters.cuisine && !cuisines.includes(filters.cuisine)
      ? [filters.cuisine, ...cuisines]
      : cuisines;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 ring-1 ring-neutral-200/70 lg:flex-row lg:items-center lg:justify-between">
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">Diet</legend>
        {DIETS.map((diet) => {
          const active = filters.diets.includes(diet.value);
          return (
            <button
              key={diet.value}
              type="button"
              aria-pressed={active}
              onClick={() =>
                onChange({
                  diets: active
                    ? filters.diets.filter((d) => d !== diet.value)
                    : [...filters.diets, diet.value],
                })
              }
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition-colors",
                active
                  ? "bg-leaf text-white ring-leaf"
                  : "bg-white text-neutral-700 ring-neutral-300 hover:bg-neutral-50",
              )}
            >
              {active && <Check aria-hidden className="size-3.5" />}
              {diet.label}
            </button>
          );
        })}
      </fieldset>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.cuisine ?? ANY}
          onValueChange={(v) => onChange({ cuisine: v === ANY ? null : v })}
        >
          <SelectTrigger className="w-40" aria-label="Cuisine">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>All cuisines</SelectItem>
            {cuisineOptions.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.maxTime ? String(filters.maxTime) : ANY}
          onValueChange={(v) =>
            onChange({ maxTime: v === ANY ? null : Number(v) })
          }
        >
          <SelectTrigger className="w-36" aria-label="Maximum time">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any time</SelectItem>
            {MAX_TIMES.map((t) => (
              <SelectItem key={t} value={String(t)}>
                Under {t} min
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sort}
          onValueChange={(v) => onChange({ sort: v as Sort })}
        >
          <SelectTrigger className="w-40" aria-label="Sort by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORTS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X aria-hidden className="size-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
