export interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  healthScore: number;
  cuisines: string[];
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  ketogenic: boolean;
  extendedIngredients?: Ingredient[];
  analyzedInstructions?: Instruction[];
  nutrition?: Nutrition;
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
}
