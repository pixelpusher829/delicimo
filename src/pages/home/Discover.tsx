import {
  Cake,
  Coffee,
  Drumstick,
  Fish,
  Salad,
  Soup,
  Timer,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router";
import { RecipeGrid } from "@/components/RecipeGrid";
import { useRecipeList } from "@/hooks/useRecipeList";
import { clearList } from "@/lib/recipeStore";

// Starting points that cost nothing until clicked; each is an ordinary cached search.
const CATEGORIES: { label: string; query: string; icon: LucideIcon }[] = [
  { label: "Breakfast", query: "breakfast", icon: Coffee },
  { label: "Chicken dinners", query: "chicken", icon: Drumstick },
  { label: "Pasta", query: "pasta", icon: UtensilsCrossed },
  { label: "Seafood", query: "salmon", icon: Fish },
  { label: "Salads", query: "salad", icon: Salad },
  { label: "Soups", query: "soup", icon: Soup },
  { label: "Quick & easy", query: "quick", icon: Timer },
  { label: "Desserts", query: "dessert", icon: Cake },
];

const Discover = () => {
  const recent = useRecipeList("recent");
  const saved = useRecipeList("favorites");

  return (
    <div className="bg-neutral-50">
      <div className="m-auto flex max-w-360 flex-col gap-14 px-4 py-12 sm:px-6">
        <section aria-labelledby="browse-heading">
          <h2 id="browse-heading" className="mb-5 text-3xl">
            Browse by category
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {CATEGORIES.map(({ label, query, icon: Icon }) => (
              <li key={query}>
                <Link
                  to={`/?q=${encodeURIComponent(query)}`}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {recent.length > 0 && (
          <section aria-labelledby="recent-heading">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h2 id="recent-heading" className="text-3xl">
                Recently viewed
              </h2>
              <button
                type="button"
                onClick={() => clearList("recent")}
                className="text-sm text-neutral-600 underline-offset-2 hover:text-neutral-900 hover:underline"
              >
                Clear history
              </button>
            </div>
            <RecipeGrid recipes={recent.slice(0, 8)} />
          </section>
        )}

        {saved.length > 0 && (
          <section aria-labelledby="saved-heading">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h2 id="saved-heading" className="text-3xl">
                Your saved recipes
              </h2>
              <Link
                to="/saved"
                className="text-sm font-semibold text-leaf underline-offset-2 hover:underline"
              >
                View all ({saved.length})
              </Link>
            </div>
            <RecipeGrid recipes={saved.slice(0, 4)} />
          </section>
        )}
      </div>
    </div>
  );
};

export default Discover;
