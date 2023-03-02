import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeHeader from "./RecipeHeader";
import Directions from "@/components/Direction/Directions";
import Ingredients from "@/components/Ingredients/Ingredients";
import {
  fetchRecipes,
  recipeSelectors,
  resetSubmitState,
  selectFetchState as selectRecipeFetchState,
  selectSubmitState,
} from "@/store/recipesSlice";
import { AppDispatch, AppState } from "@/store/store";

const Recipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const recipeFetchState = useSelector(selectRecipeFetchState);
  const recipeSubmitState = useSelector(selectSubmitState);
  const recipeId = router.query.id;

  useEffect(() => {
    if (recipeFetchState === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipeFetchState]);

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
      <section className="flex gap-5 flex-wrap sm:flex-nowrap">
        <aside className="w-full sm:w-4/12">
          <h3 className="text-xl mb-2">Ingredienser</h3>
          <Ingredients recipeId={recipeId} />
        </aside>
        <section className="flex-1">
          <h3 className="text-xl mb-2">Beskrivning</h3>
          <Directions recipeId={recipeId} />
        </section>
      </section>
    </>
  );
};

export default Recipe;
