import { IIngredient, IIngredientMapping } from "../interfaces";

export const addIngredientsToDirection = (
  direction: string,
  directionIndex: number,
  ingredientMappings?: IIngredientMapping[],
  ingredients?: IIngredient[]
) => {
  const words = direction.split(" ");

  return words
    .map((word, index) => {
      const mappedIngredient = ingredientMappings?.find(
        (i) => i.wordIndex === index && i.directionIndex === directionIndex
      );

      if (mappedIngredient && ingredients) {
        const ingredient = ingredients.find(
          (i) => i.name === mappedIngredient.ingredientName
        ) as IIngredient;

        if (ingredient) {
          if (word.includes(",")) {
            const [first, ...rest] = word.split(",");
            return [`${first} (${ingredient.amount})`, rest].join(",");
          } else {
            return `${word} (${ingredient.amount})`;
          }
        }
      }

      return word;
    })
    .join(" ");
};
