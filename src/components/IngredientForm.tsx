import { IIngredientFields } from "@/interfaces";
import {
  addIngredient,
  deleteIngredient,
  resetSubmitState,
  selectSelectedIngredient,
  selectSubmitState,
  setSelectedIngredientId,
  updateIngredient,
} from "@/store/ingredientSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Input: FC<{ value: string }> = ({ value }) => {
  return (
    <label className="block text-sm mb-2">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic"
        name="Foo"
        placeholder="Foo"
        defaultValue={value}
      />
    </label>
  );
};

const EditRecipe: FC = () => {
  const router = useRouter();
  const recipeId = router.query.id;
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);

  const selectedIngredient = useSelector(selectSelectedIngredient);

  // useEffect(() => {
  //   if (submitState === "idle") {
  //     setIsEdit(!!selectedIngredient);
  //   }
  // }, [submitState, selectedIngredient]);

  useEffect(() => {
    if (submitState === "fulfilled") {
      dispatch(resetSubmitState());
      dispatch(setSelectedIngredientId(null));
    }
  }, [dispatch, submitState]);

  return (
    <div>
      {/* {isEdit ? ( */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const postData = Object.assign(
            {},
            ...Array.from(new FormData(e.target as HTMLFormElement))
              .filter(([_key, value]) => value)
              .map(([key, value]) => ({ [key]: value }))
          ) as IIngredientFields;

          if (selectedIngredient) {
            dispatch(
              updateIngredient({
                fields: postData,
                id: selectedIngredient.id,
              })
            );
          } else {
            dispatch(
              addIngredient({ ...postData, Recipes: [recipeId as string] })
            );
          }
        }}
      >
        <div className="flex mt-5 gap-2">
          <div className="mb-4">
            <label className="block text-sm mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic"
                name="Name"
                placeholder="Namn"
                defaultValue={selectedIngredient?.fields.Name}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic"
                name="Quantity"
                placeholder="Mängd"
                defaultValue={selectedIngredient?.fields.Quantity}
              />
            </label>
          </div>
        </div>
        <button className="bg-slate-400 border rounded py-2 px-3 mr-2">
          Spara
        </button>
        <button
          className="border rounded py-2 px-3"
          onClick={() => {
            dispatch(setSelectedIngredientId(null));
          }}
        >
          Avbryt
        </button>
        <button
          className="bg-slate-400 border rounded py-2 px-3 mr-2"
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Är du säker?")) {
              dispatch(deleteIngredient(selectedIngredient?.id as string));
            }
          }}
        >
          Ta bort
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
