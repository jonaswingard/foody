import { IRecipeFields } from "@/interfaces";
import {
  addRecipe,
  recipeSelectors,
  selectSubmitState,
  updateRecipe,
} from "@/store/recipesSlice";
import { AppDispatch, AppState } from "@/store/store";
import Link from "next/link";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";

const EditRecipeForm: FC<{ recipeId?: string | string[] }> = ({ recipeId }) => {
  const recipe = useSelector((state: AppState) =>
    recipeSelectors.selectById(state, recipeId as string)
  );
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);

  return (
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
          <Input
            name="Name"
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
          <Input
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
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic"
            name="TotalTime"
            placeholder="Tid"
            defaultValue={recipe?.fields.TotalTime}
          />
        </label>
      </div>

      <div className="flex gap-2 mt-10">
        <Button disabled={submitState === "pending"} variant="primary">
          {submitState === "pending" ? "Sparar..." : "Spara recept"}
        </Button>
        <Link
          className="border rounded py-2 px-3 bg-white shadow-md border-slate-300"
          href={`/recipe/${recipeId}`}
        >
          Avbryt
        </Link>
      </div>
    </form>
  );
};

export default EditRecipeForm;
