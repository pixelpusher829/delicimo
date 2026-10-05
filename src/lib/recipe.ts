import type { Ingredient, Nutrient, Recipe } from "@/types";

export type UnitSystem = "us" | "metric";

/** True when a recipe has everything the detail page renders. */
export function isCompleteRecipe(r: Recipe): boolean {
  return Boolean(
    r.extendedIngredients?.length && r.analyzedInstructions && r.nutrition,
  );
}

const SPOONACULAR_IMAGE =
  /^(https:\/\/img\.spoonacular\.com\/recipes\/\d+)-\d+x\d+(\.\w+)$/;

/**
 * Spoonacular's image CDN serves several sizes of every recipe photo, and image
 * requests don't count against the API quota. Swap in a sharper size.
 */
export function recipeImage(
  url: string | undefined,
  size: "312x231" | "480x360" | "556x370" | "636x393" = "556x370",
): string | undefined {
  if (!url) return undefined;
  return url.replace(SPOONACULAR_IMAGE, `$1-${size}$2`);
}

const FRACTIONS: [number, string][] = [
  [0, ""],
  [1 / 8, "⅛"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [3 / 8, "⅜"],
  [1 / 2, "½"],
  [5 / 8, "⅝"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
  [7 / 8, "⅞"],
  [1, ""],
];

/** Formats an amount for display: 1.5 -> "1 ½", 0.333 -> "⅓", 425.24 -> "425". */
export function formatAmount(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  if (value >= 10) return String(Math.round(value));

  const whole = Math.floor(value);
  const rest = value - whole;
  let best = FRACTIONS[0];
  for (const f of FRACTIONS) {
    if (Math.abs(rest - f[0]) < Math.abs(rest - best[0])) best = f;
  }

  // Not close to a common fraction: show one decimal place instead.
  if (Math.abs(rest - best[0]) > 0.04) {
    return String(Math.round(value * 10) / 10);
  }
  const wholePart = best[0] === 1 ? whole + 1 : whole;
  if (!best[1]) return String(wholePart);
  return wholePart ? `${wholePart} ${best[1]}` : best[1];
}

/** Amount and unit for an ingredient, scaled by `factor`, in the chosen system. */
export function ingredientQuantity(
  ingredient: Ingredient,
  system: UnitSystem,
  factor = 1,
): { amount: string; unit: string } {
  const measure = ingredient.measures?.[system];
  const amount = (measure?.amount ?? ingredient.amount) * factor;
  const unit = measure?.unitShort ?? ingredient.unit;
  return { amount: formatAmount(amount), unit };
}

export function formatMinutes(minutes: number): string {
  if (!minutes || minutes < 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

/** Spoonacular prices are US cents per serving. */
export function formatPrice(cents?: number): string | undefined {
  if (cents == null || cents <= 0) return undefined;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function getNutrient(r: Recipe, name: string): Nutrient | undefined {
  return r.nutrition?.nutrients.find((n) => n.name === name);
}

/** Primary label shown on a card: first cuisine, else first dish type. */
export function recipeCategory(r: Recipe): string | undefined {
  const label = r.cuisines[0] ?? r.dishTypes?.[0];
  return label && label.charAt(0).toUpperCase() + label.slice(1);
}
