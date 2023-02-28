import { FC, useEffect } from "react";
import { IRecipeFields } from "@/interfaces";
import {
  addRecipe,
  fetchRecipes,
  recipeSelectors,
  resetSubmitState,
  selectFetchState as selectRecipeFetchState,
  selectSubmitState,
  updateRecipe,
} from "@/store/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/store";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  fetchDirections,
  selectFetchState as selectDirectionFetchState,
  selectByRecipeId as selectDirectionsByRecipeId,
} from "@/store/directionsSlice";
import Directions from "./Direction/Directions";

const RecipeForm: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);
  const recipeFetchState = useSelector(selectRecipeFetchState);

  const recipeId = router.query.id;
  const recipe = useSelector((state: AppState) =>
    recipeSelectors.selectById(state, recipeId as string)
  );

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
      <div className="w-full max-w-l bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="max-w-xs">
          <form
            id="recipe-form"
            onSubmit={(e) => {
              e.preventDefault();

              const postData = Object.assign(
                {},
                ...Array.from(new FormData(e.target as HTMLFormElement))
                  .filter(([key, value]) => value)
                  .map(([key, value]) => ({ [key]: value }))
                  .map((x) => {
                    if (x.Servings) {
                      return {
                        Servings: parseInt(x.Servings as string),
                      };
                    }

                    return x;
                  })
              ) as IRecipeFields;

              if (recipe) {
                dispatch(
                  updateRecipe({
                    fields: postData,
                    id: recipe.id,
                  })
                );
              } else {
                dispatch(addRecipe(postData));
              }
            }}
          >
            <div className="mb-4">
              <label className="block text-sm">
                <span>Namn</span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight placeholder-gray-500 placeholder:italic"
                  name="Name"
                  type="text"
                  placeholder="Receptnamn"
                  defaultValue={recipe?.fields.Name}
                />
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">
                <span>Svårighetsgrad</span>
                <div className="inline-block relative w-64">
                  <select
                    name="Difficulty"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={recipe?.fields.Difficulty}
                  >
                    <option>Enkel</option>
                    <option>Mellan</option>
                    <option>Svår</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                <span>Antal portioner</span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic"
                  type="number"
                  name="Servings"
                  placeholder="Portioner"
                  defaultValue={recipe?.fields.Servings}
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                <span>Tid</span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic"
                  type="text"
                  name="TotalTime"
                  placeholder="Tid"
                  defaultValue={recipe?.fields.TotalTime}
                />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                disabled={submitState === "pending"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25"
              >
                {submitState === "pending" ? "Sparar..." : "Spara recept"}
              </button>
              <Link href={`/recipe/${recipeId}`}>Avbryt</Link>
            </div>
          </form>
        </div>
      </div>
      <section className="flex gap-5 flex-wrap md:flex-nowrap">
        <aside>
          <h3>Ingredienser</h3>
          {/* <Ingredients ingredients={ingredients} /> */}
        </aside>
        <section className="w-full">
          <h3>Beskrivning</h3>
          <Directions isEditing recipeId={recipeId} />
        </section>
      </section>
    </>
  );
};

export default RecipeForm;
