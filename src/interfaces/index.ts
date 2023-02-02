export interface IIngredient {
  amount: string;
  name: string;
  id: number;
}

export interface IRecipe {
  id: string;
  ingredients: IIngredient[];
  directions: string[];
  name: string;
  servings: string;
  totalTime: string;
  difficulty: string;
}

export interface IIngredientMapping {
  wordIndex: number;
  directionIndex: number;
  ingredientName: string;
}

export interface IBaseState {
  fetchState: "idle" | "pending" | "fulfilled";
}

export interface IRecipeRecord {
  id: string;
  fields: IRecipeFields;
}

export interface IAirtableRecord<T> {
  id: string;
  fields: T;
}

export interface IRecipeFields {
  Servings: number;
  Difficulty: string;
  Name: string;
  brought: boolean;
  Ingredients: string[];
  Directions: string[];
  TotalTime: string;
}

export interface IDirectionFields {
  Direction: string;
  SortOrder: number;
  brought: boolean;
}

export interface IIngredientFields {
  Recipes: string;
  Name: string;
  SelectName: string;
  Quantity: string;
  brought: boolean;
}
