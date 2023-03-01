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
import { Button } from "../Button";
import TextArea from "../TextArea";
import { Input } from "../Input";

const UpdateDirectionForm: FC<{
  direction: IAirtableRecord<IDirectionFields>;
}> = ({ direction }) => {
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);

  return (
    <form
      className="flex gap-2 mb-4"
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
      <TextArea name="Direction" defaultValue={direction.fields.Direction} />
      <div className="flex-shrink-0 w-2/12">
        <label className="flex items-center gap-2">
          <div className="text-center">SortOrder</div>
          <Input
            className="text-center py-1"
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
