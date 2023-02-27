import {
  addDirection,
  deleteDirection,
  selectAllDirections,
  selectSubmitState,
  updateDirection,
} from "@/store/directionsSlice";
import { AppDispatch } from "@/store/store";
import { getFormData } from "@/utils";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAirtableRecord, IDirectionFields, IIngredient } from "../interfaces";
import AddDirectionForm from "./Direction/AddDirectionForm";
import Direction from "./Direction/Direction";
import UpdateDirectionForm from "./Direction/UpdateDirectionForm";

const Directions: FC<{
  directions: IAirtableRecord<IDirectionFields>[];
  isEditing: boolean;
}> = ({ directions, isEditing }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="mb-12">
      {visible && (
        <div
          className="fixed bg-white border mt-5"
          style={{ left: position.left, top: position.top }}
        >
          {/* <Selector
            onClick={() => setVisible(false)}
            ingredients={ingredients}
          /> */}
        </div>
      )}
      <ol>
        {directions
          .sort((a, b) => {
            if (a.fields.SortOrder > b.fields.SortOrder) {
              return 1;
            } else if (a.fields.SortOrder < b.fields.SortOrder) {
              return -1;
            }

            return 0;
          })
          .map((direction, index) => (
            <li className="mb-4" key={index}>
              {isAdding ? (
                <UpdateDirectionForm direction={direction} />
              ) : (
                <Direction direction={direction} isEditing={isEditing} />
              )}
            </li>
          ))}
        {/* {directions?.map((direction) => (
          <li
            className="mb-4 p-3 rounded-lg shadow-md bg-white"
            key={direction}
          >
            <div
              onMouseUp={() => {
                if (!isEditing) {
                  return;
                }

                const selection = window.getSelection();
                if (selection?.toString().trim()) {
                  setVisible(true);

                  const range = selection?.getRangeAt(0);
                  const rect = range?.getBoundingClientRect();
                  setPosition({
                    left: rect?.width + rect?.left || 0,
                    top: rect?.top - rect?.height - 8 || 0,
                  });

                  const direction = range.commonAncestorContainer.textContent;
                  const words = direction?.split(" ");
                  const word = selection?.toString();
                  const wordIndex = words?.findIndex((w) => w === word);

                  console.log({ wordIndex });
                }
              }}
            >
              <label className="flex gap-2">
                {!isEditing && (
                  <input type="checkbox" className="peer hidden" />
                )}
                <div className="peer-checked:text-gray-300">{direction}</div>
              </label>
            </div>
          </li>
        ))} */}
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
