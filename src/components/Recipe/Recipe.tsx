import Directions from "@/components/Direction/Directions";
import Ingredients from "@/components/Ingredients/Ingredients";
import {
  fetchIngredients,
  selectByRecipeId as selectIngredientsByRecipeId,
  selectFetchState as selectIngredientFetchState,
} from "@/store/ingredientSlice";
import {
  fetchRecipes,
  recipeSelectors,
  resetSubmitState,
  selectFetchState as selectRecipeFetchState,
  selectSubmitState,
} from "@/store/recipesSlice";
import { AppDispatch, AppState } from "@/store/store";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeHeader from "./RecipeHeader";

const Recipe = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const recipeFetchState = useSelector(selectRecipeFetchState);
  const recipeSubmitState = useSelector(selectSubmitState);
  const ingredientsFetchState = useSelector(selectIngredientFetchState);
  const recipeId = router.query.id;
  const ingredients = useSelector((state) =>
    selectIngredientsByRecipeId(state as AppState, recipeId as string)
  );

  useEffect(() => {
    if (recipeFetchState === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipeFetchState]);

  useEffect(() => {
    if (ingredientsFetchState === "idle") {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsFetchState]);

  useEffect(() => {
    if (recipeSubmitState === "fulfilled") {
      dispatch(resetSubmitState());
      router.push("/");
    }
  }, [dispatch, recipeSubmitState, router]);

  const recipe = useSelector((state: AppState) =>
    recipeSelectors.selectById(state, recipeId as string)
  );

  if (!recipe) {
    return null;
  }

  return (
    <>
      <RecipeHeader recipeId={recipeId} />
      <section className="flex gap-5 flex-wrap md:flex-nowrap">
        <aside>
          <h3>Ingredienser</h3>
          <Ingredients ingredients={ingredients} />
        </aside>
        <section className="w-full">
          <h3>Beskrivning</h3>
          <Directions recipeId={recipeId} />
        </section>
      </section>
    </>
  );
};

export default Recipe;
