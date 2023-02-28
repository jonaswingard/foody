import { FC, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IDirectionFields } from "@/interfaces";
import { addDirection, selectSubmitState } from "@/store/directionsSlice";
import { AppDispatch } from "@/store/store";
import { getFormData } from "@/utils";
import { Button } from "./Button";

const AddDirectionForm: FC<{ onAdding: () => void }> = ({ onAdding }) => {
  const router = useRouter();
  const recipeId = router.query.id;
  const dispatch = useDispatch<AppDispatch>();
  const submitState = useSelector(selectSubmitState);
  const directionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (submitState === "fulfilled" && directionRef.current) {
      directionRef.current.value = "";
      directionRef.current.focus();
    }
  }, [submitState]);

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
        ref={directionRef}
      />
      <div>
        <Button disabled={submitState === "pending"} variant="primary">
          {submitState === "pending" ? "Lägger till..." : "Lägg till"}
        </Button>

        <Button disabled={submitState === "pending"} onClick={onAdding}>
          Avbryt
        </Button>
      </div>
    </form>
  );
};

export default AddDirectionForm;
