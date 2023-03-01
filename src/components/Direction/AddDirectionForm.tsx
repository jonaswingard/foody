import { FC, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IDirectionFields } from "@/interfaces";
import { addDirection, selectSubmitState } from "@/store/directionsSlice";
import { AppDispatch } from "@/store/store";
import { getFormData } from "@/utils";
import { Button } from "../Button";
import TextArea from "../TextArea";

const AddDirectionForm: FC = () => {
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
      className="flex gap-2 mb-4"
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
      <TextArea
        name="Direction"
        placeholder="Add a direction"
        ref={directionRef}
      />
      <div className="flex-shrink-0 w-2/12">
        <Button
          className="w-full"
          disabled={submitState === "pending"}
          variant="primary"
        >
          {submitState === "pending" ? "Lägger till..." : "Lägg till"}
        </Button>
      </div>
    </form>
  );
};

export default AddDirectionForm;
