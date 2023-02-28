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
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditRecipe: FC<{ onCancel?: () => void; isAdding?: boolean }> = ({
  onCancel,
  isAdding,
}) => {
  const router = useRouter();
  const recipeId = router.query.id;
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);
  const selectedIngredient = useSelector(selectSelectedIngredient);

  useEffect(() => {
    if (isAdding && submitState === "fulfilled") {
      if (nameRef.current && quantityRef.current) {
        quantityRef.current.value = "";
        nameRef.current.value = "";
        nameRef.current.focus();
      }
    }
  }, [isAdding, submitState]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
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
        <div className="flex mt-2 gap-2">
          <div className="mb-4">
            <label className="block text-sm mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic disabled:text-gray-300"
                name="Name"
                placeholder="Namn"
                autoFocus
                defaultValue={selectedIngredient?.fields.Name}
                ref={nameRef}
                disabled={submitState === "pending"}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic disabled:text-gray-300"
                name="Quantity"
                placeholder="Mängd"
                defaultValue={selectedIngredient?.fields.Quantity}
                disabled={submitState === "pending"}
                ref={quantityRef}
              />
            </label>
          </div>
        </div>
        <button
          className="bg-slate-400 border rounded py-2 px-3 mr-2 disabled:opacity-25"
          disabled={submitState === "pending"}
        >
          {submitState === "pending" ? "Sparar..." : "Spara"}
        </button>
        <button
          className="border rounded py-2 px-3 disabled:opacity-25"
          disabled={submitState === "pending"}
          onClick={() => {
            dispatch(setSelectedIngredientId(null));
            onCancel?.();
          }}
        >
          Avbryt
        </button>
        {selectedIngredient && (
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
        )}
      </form>
    </div>
  );
};

export default EditRecipe;
