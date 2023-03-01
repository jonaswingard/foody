import { IAirtableRecord, IIngredientFields } from "@/interfaces";
import { deleteIngredient, selectSubmitState } from "@/store/ingredientSlice";
import { AppDispatch } from "@/store/store";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";

const EditIngredientForm: FC<{
  ingredient: IAirtableRecord<IIngredientFields>;
}> = ({ ingredient }) => {
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);

  return (
    <form className="flex mt-2 gap-2">
      <Input
        name="Name"
        placeholder="Namn"
        autoFocus
        defaultValue={ingredient?.fields.Name}
        disabled={submitState === "pending"}
      />
      <Input
        name="Quantity"
        placeholder="Mängd"
        defaultValue={ingredient?.fields.Quantity}
        disabled={submitState === "pending"}
      />
      <div className="flex-shrink-0 w-3/12">
        <Button
          className="mr-2"
          disabled={submitState === "pending"}
          variant="primary"
        >
          {submitState === "pending" ? "Sparar..." : "Spara"}
        </Button>
        <Button
          type="button"
          disabled={submitState === "pending"}
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Är du säker?")) {
              dispatch(deleteIngredient(ingredient?.id as string));
            }
          }}
          variant="secondary"
        >
          Ta bort
        </Button>
      </div>
    </form>
  );
};

export default EditIngredientForm;
