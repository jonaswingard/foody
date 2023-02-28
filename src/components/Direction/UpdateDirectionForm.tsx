import { FC } from "react";
import { IAirtableRecord, IDirectionFields } from "@/interfaces";
import {
  deleteDirection,
  selectSubmitState,
  updateDirection,
} from "@/store/directionsSlice";
import { AppDispatch } from "@/store/store";
import { getFormData } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";

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
        <label>
          <div className="text-center pt-2">SortOrder</div>
          <input
            className="text-center w-28 py-1 shadow-md"
            name="SortOrder"
            defaultValue={direction.fields.SortOrder}
          />
        </label>

        <Button
          className="block w-full mt-5"
          disabled={submitState === "pending"}
          variant="primary"
        >
          Spara
        </Button>
        <Button
          className="block w-full"
          disabled={submitState === "pending"}
          onClick={() => dispatch(deleteDirection(direction.id))}
          type="button"
        >
          Ta bort
        </Button>
        <Button
          className="block w-full"
          type="button"
          disabled={submitState === "pending"}
        >
          Flytta upp
        </Button>
        <Button
          className="block w-full"
          type="button"
          disabled={submitState === "pending"}
        >
          Flytta ned
        </Button>
      </div>
    </form>
  );
};

export default UpdateDirectionForm;
