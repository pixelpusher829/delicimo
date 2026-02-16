export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings: number;
  readyInMinutes: number;
  preparationMinutes?: number;
  cookingMinutes?: number;
  license?: string;
  sourceName?: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  healthScore: number;
  spoonacularScore?: number;
  pricePerServing?: number;
  cheap?: boolean;
  creditsText?: string;
  cuisines: string[];
  dairyFree?: boolean;
  diets?: string[];
  gaps?: string;
  glutenFree?: boolean;
  instructions?: string;
  ketogenic?: boolean;
  lowFodmap?: boolean;
  occasions?: string[];
  sustainable?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  veryHealthy?: boolean;
  veryPopular?: boolean;
  whole30?: boolean;
  weightWatcherSmartPoints?: number;
  dishTypes: string[];
  extendedIngredients?: Ingredient[];
  summary: string;
  analyzedInstructions?: Instruction[];
  nutrition?: Nutrition;
  similarRecipes?: SimilarRecipe[];
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
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
  percentOfDailyNeeds: number;
}

export interface SimilarRecipe {
  id: number;
  title: string;
  image: string;
}
