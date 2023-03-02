import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/store";
import {
  resetSubmitState,
  selectByRecipeId,
  selectSubmitState,
  setSelectedIngredientId,
  fetchIngredients,
  selectFetchState,
} from "@/store/ingredientSlice";

const Ingredients: FC<{ recipeId?: string | string[] }> = ({ recipeId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);
  const fetchState = useSelector(selectFetchState);

  const ingredients = useSelector((state) =>
    selectByRecipeId(state as AppState, recipeId as string)
  );

  useEffect(() => {
    if (fetchState === "idle") {
      dispatch(fetchIngredients());
    }
  }, [dispatch, fetchState]);

  useEffect(() => {
    if (submitState === "fulfilled") {
      dispatch(resetSubmitState());
      dispatch(setSelectedIngredientId(null));
    }
  }, [dispatch, submitState]);

  return ingredients?.length ? (
    <div className="p-3 rounded-lg shadow-md bg-white">
      <table className="w-64">
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient?.fields.Name}</td>
              <td>{ingredient?.fields.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Ingredients;
