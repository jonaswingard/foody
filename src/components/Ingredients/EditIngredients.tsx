import { FC, useEffect } from "react";
import { AppDispatch, AppState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  selectByRecipeId,
  selectFetchState,
} from "@/store/ingredientSlice";
import AddIngredientForm from "./AddIngredientForm";
import EditIngredientForm from "./EditIngredientForm";

const EditIngredients: FC<{ recipeId?: string | string[] }> = ({
  recipeId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchState = useSelector(selectFetchState);
  const ingredients = useSelector((state) =>
    selectByRecipeId(state as AppState, recipeId as string)
  );

  useEffect(() => {
    if (fetchState === "idle") {
      dispatch(fetchIngredients());
    }
  }, [dispatch, fetchState]);

  return (
    <div className="p-3 rounded-lg shadow-md bg-white">
      <div className="mb-4">
        {ingredients.map((ingredient) => (
          <EditIngredientForm key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>

      <AddIngredientForm recipeId={recipeId} />
    </div>
  );
};

export default EditIngredients;
