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
      <table className="w-full">
        <tbody>
          {ingredients.map((ingredient) => (
            <tr className="border-b-2 border-b-slate-200" key={ingredient.id}>
              <td className="py-1">{ingredient?.fields.Quantity}</td>
              <td>{ingredient?.fields.Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Ingredients;
