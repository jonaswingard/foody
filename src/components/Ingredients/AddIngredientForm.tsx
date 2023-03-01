import { IIngredientFields } from "@/interfaces";
import { addIngredient, selectSubmitState } from "@/store/ingredientSlice";
import { AppDispatch } from "@/store/store";
import React, { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";

const AddIngredientForm: FC<{ recipeId?: string | string[] }> = ({
  recipeId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (submitState === "fulfilled" && nameRef.current && quantityRef.current) {
      quantityRef.current.value = "";
      nameRef.current.value = "";
      nameRef.current.focus();
    }
  }, [submitState]);

  return (
    <form
      className="flex mt-2 gap-2"
      onSubmit={(e) => {
        e.preventDefault();

        const postData = Object.assign(
          {},
          ...Array.from(new FormData(e.target as HTMLFormElement))
            .filter(([_key, value]) => value)
            .map(([key, value]) => ({ [key]: value }))
        ) as IIngredientFields;

        dispatch(addIngredient({ ...postData, Recipes: [recipeId as string] }));
      }}
    >
      <Input
        name="Name"
        placeholder="Namn"
        autoFocus
        ref={nameRef}
        disabled={submitState === "pending"}
      />
      <Input
        name="Quantity"
        placeholder="Mängd"
        disabled={submitState === "pending"}
        ref={quantityRef}
      />
      <div className="flex-shrink-0 w-3/12">
        <Button disabled={submitState === "pending"} variant="primary">
          {submitState === "pending" ? "Lägger till..." : "Lägg till"}
        </Button>
      </div>
    </form>
  );
};

export default AddIngredientForm;
