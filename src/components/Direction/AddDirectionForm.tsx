import { IDirectionFields } from "@/interfaces";
import { addDirection, selectSubmitState } from "@/store/directionsSlice";
import { AppDispatch } from "@/store/store";
import { getFormData } from "@/utils";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddDirectionForm: FC<{ onAdding: () => void }> = ({ onAdding }) => {
  const router = useRouter();
  const recipeId = router.query.id;
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);

  return (
    <form
      className="text-right mt-2"
      onSubmit={(e) => {
        e.preventDefault();

        dispatch(
          addDirection({
            ...(getFormData(e.currentTarget) as IDirectionFields),
            SortOrder: 99,
            Recipes: [recipeId as string],
          })
        );
      }}
    >
      <textarea
        className="w-full p-3 rounded-lg shadow-md bg-white"
        name="Direction"
        placeholder="Add a direction"
      />
      <div>
        <button
          className="bg-slate-400 border rounded py-2 px-3 mr-2 disabled:opacity-25"
          disabled={submitState === "pending"}
        >
          {submitState === "pending" ? "Lägger till..." : "Lägg till"}
        </button>
        <button
          className="border rounded py-2 px-3 disabled:opacity-25"
          disabled={submitState === "pending"}
          onClick={onAdding}
        >
          Avbryt
        </button>
      </div>
    </form>
  );
};

export default AddDirectionForm;
