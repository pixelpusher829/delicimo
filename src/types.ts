// Shapes returned by our /api proxy. The proxy trims Spoonacular's (very large)
// payloads down to these fields so they are cheap to cache in localStorage.

export interface Recipe {
  id: number;
  title: string;
  image?: string;
  servings: number;
  readyInMinutes: number;
  healthScore: number;
  aggregateLikes?: number;
  pricePerServing?: number;
  cuisines: string[];
  dishTypes?: string[];
  diets?: string[];
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy?: boolean;
  summary?: string;
  sourceUrl?: string;
  sourceName?: string;
  creditsText?: string;
  extendedIngredients?: Ingredient[];
  analyzedInstructions?: Instruction[];
  nutrition?: Nutrition;
}

export interface Measure {
  amount: number;
  unitShort: string;
}

export interface Ingredient {
  id: number;
  name: string;
  original?: string;
  amount: number;
  unit: string;
  measures?: {
    us: Measure;
    metric: Measure;
  };
}

export interface Instruction {
  name?: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
}

export interface Nutrition {
  nutrients: Nutrient[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export interface SearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
  /** Set when these are sample recipes because live search was unavailable. */
  fallback?: { matched: boolean };
}
