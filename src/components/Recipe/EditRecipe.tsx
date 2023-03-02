import { FC, useEffect } from "react";
import {
  fetchRecipes,
  resetSubmitState,
  selectFetchState as selectRecipeFetchState,
  selectSubmitState,
} from "@/store/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import Directions from "../Direction/Directions";
import EditIngredients from "../Ingredients/EditIngredients";
import EditRecipeForm from "./EditRecipeForm";

const RecipeForm: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);
  const recipeFetchState = useSelector(selectRecipeFetchState);
  const recipeId = router.query.id;

  useEffect(() => {
    if (recipeFetchState === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipeFetchState]);

  useEffect(() => {
    if (submitState === "fulfilled") {
      dispatch(resetSubmitState());

      router.push(recipeId ? `/recipe/${recipeId}` : "/");
    }
  }, [dispatch, submitState, router, recipeId]);

  return (
    <>
      <div className="w-full max-w-l bg-white shadow-md rounded px-8 pt-6 pb-12 mb-6">
        <div className="max-w-xs">
          <EditRecipeForm recipeId={recipeId} />
        </div>
      </div>
      <section className="w-full mb-6">
        <h3 className="text-xl mb-2">Ingredienser</h3>
        <EditIngredients recipeId={recipeId} />
      </section>
      <section className="w-full mb-4">
        <h3 className="text-xl mb-2">Beskrivning</h3>
        <Directions isEditing recipeId={recipeId} />
      </section>
    </>
  );
};

export default RecipeForm;
