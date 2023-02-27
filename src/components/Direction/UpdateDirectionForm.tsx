import React, { FC } from "react";
import { IAirtableRecord, IDirectionFields } from "@/interfaces";
import {
  deleteDirection,
  selectSubmitState,
  updateDirection,
} from "@/store/directionsSlice";
import { AppDispatch } from "@/store/store";
import { getFormData } from "@/utils";
import { useDispatch, useSelector } from "react-redux";

const UpdateDirectionForm: FC<{
  direction: IAirtableRecord<IDirectionFields>;
}> = ({ direction }) => {
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const postData = getFormData(e.currentTarget) as IDirectionFields;

        dispatch(
          updateDirection({
            id: direction.id,
            fields: {
              ...postData,
              SortOrder: Number(postData.SortOrder),
            },
          })
        );
      }}
    >
      <textarea
        className="w-full p-3 rounded-lg shadow-md bg-white"
        name="Direction"
        defaultValue={direction.fields.Direction}
      />
      <div className="flex-shrink-0">
        <button
          className="bg-white border rounded py-2 px-3 block w-full disabled:opacity-25"
          disabled={submitState === "pending"}
        >
          Spara
        </button>
        <button
          type="button"
          className="bg-white border rounded py-2 px-3 block w-full disabled:opacity-25"
          disabled={submitState === "pending"}
          onClick={() => {
            dispatch(deleteDirection(direction.id));
          }}
        >
          Ta bort
        </button>
        <button
          type="button"
          disabled={submitState === "pending"}
          className="bg-white border rounded py-2 px-3 block w-full disabled:opacity-25"
        >
          Flytta upp
        </button>
        <button
          type="button"
          disabled={submitState === "pending"}
          className="bg-white border rounded py-2 px-3 block w-full disabled:opacity-25"
        >
          Flytta ned
        </button>
        <label>
          <div className="text-center pt-2">SortOrder</div>
          <input
            className="text-center w-28 py-1"
            name="SortOrder"
            defaultValue={direction.fields.SortOrder}
          />
        </label>
      </div>
    </form>
  );
};

export default UpdateDirectionForm;
