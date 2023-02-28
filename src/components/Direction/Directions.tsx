import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDirections,
  selectByRecipeId,
  selectFetchState,
} from "@/store/directionsSlice";
import { AppDispatch, AppState } from "@/store/store";
import AddDirectionForm from "./AddDirectionForm";
import Direction from "./Direction";
import UpdateDirectionForm from "./UpdateDirectionForm";

const Directions: FC<{
  isEditing: boolean;
  recipeId?: string | string[];
}> = ({ isEditing, recipeId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const directionsFetchState = useSelector(selectFetchState);
  const directions = useSelector((state) =>
    selectByRecipeId(state as AppState, recipeId as string)
  );
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (directionsFetchState === "idle") {
      dispatch(fetchDirections());
    }
  }, [dispatch, directionsFetchState]);

  return (
    <div className="mb-12">
      <ol>
        {directions.map((direction, index) => (
          <li className="mb-4" key={index}>
            {isAdding ? (
              <UpdateDirectionForm direction={direction} />
            ) : (
              <Direction direction={direction} isEditing={isEditing} />
            )}
          </li>
        ))}
      </ol>

      {isAdding ? (
        <AddDirectionForm onAdding={() => setIsAdding(false)} />
      ) : (
        <div className="text-right mt-2">
          <button
            className="shadow-md bg-white rounded-full w-12 h-12"
            onClick={() => setIsAdding(true)}
          >
            🛠️
          </button>
        </div>
      )}
    </div>
  );
};

export default Directions;
