import Directions from "@/components/Direction/Directions";
import Ingredients from "@/components/Ingredients";
import {
  fetchIngredients,
  selectByRecipeId as selectIngredientsByRecipeId,
  selectFetchState as selectIngredientFetchState,
} from "@/store/ingredientSlice";
import {
  deleteRecipe,
  fetchRecipes,
  recipeSelectors,
  resetSubmitState,
  selectFetchState as selectRecipeFetchState,
  selectSubmitState,
} from "@/store/recipesSlice";
import { AppDispatch, AppState } from "@/store/store";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Recipe = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const recipeFetchState = useSelector(selectRecipeFetchState);
  const recipeSubmitState = useSelector(selectSubmitState);
  const ingredientsFetchState = useSelector(selectIngredientFetchState);
  const [isEditing, setIsEditing] = useState(false);
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

  const { Name, Difficulty, Servings, TotalTime } = recipe.fields;

  return (
    <>
      <header className="mt-5 mb-8 p-3 rounded-lg shadow-md bg-white">
        <div className="flex items-center mb-4">
          <h2 className="text-center flex-1 text-2xl">{Name}</h2>

          <button
            className="mr-2"
            onClick={() => {
              if (confirm("Är du säker på att du vill ta bort receptet?")) {
                dispatch(deleteRecipe(recipe.id));
              }
            }}
          >
            {"❌"}
          </button>

          <Link href={`/recipe/edit/${recipe.id}`}>🛠️</Link>

          {/* <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "✅" : "🛠️"}
          </button> */}
        </div>
        <div className="flex gap-3">
          <span>
            Portioner: <span className="italic">{Servings}</span>
          </span>
          <span>
            Tid: <span className="italic">{TotalTime ?? "?"}</span>
          </span>
          <span>
            Svårighetsgrad: <span className="italic">{Difficulty}</span>
          </span>
        </div>
      </header>

      <section className="flex gap-5 flex-wrap md:flex-nowrap">
        <aside>
          <h3>Ingredienser</h3>
          <Ingredients ingredients={ingredients} />
        </aside>
        <section className="w-full">
          <h3>Beskrivning</h3>
          <Directions isEditing={isEditing} recipeId={recipeId} />
        </section>
      </section>
    </>
  );
};

export default Recipe;
