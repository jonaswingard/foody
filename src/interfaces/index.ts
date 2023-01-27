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
