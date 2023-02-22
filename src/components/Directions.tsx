import { selectAllDirections } from "@/store/directionsSlice";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { IDirectionFields, IIngredient } from "../interfaces";

const Directions: FC<{
  directionIds?: string[];
  isEditing: boolean;
}> = ({ directionIds, isEditing }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const allDirections = useSelector(selectAllDirections);
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
      <ol className="">
        {directionIds
          ?.map(
            (directionId) =>
              allDirections.find((d) => d.id === directionId)
                ?.fields as IDirectionFields
          )
          .sort((a, b) => a.SortOrder - b.SortOrder)
          .map((direction, index) => (
            <li className="mb-4" key={index}>
              {isAdding ? (
                <div className="flex gap-2">
                  <textarea
                    className="w-full p-3 rounded-lg shadow-md bg-white"
                    value={direction?.Direction}
                  />
                  <div className="flex-shrink-0">
                    <button className="bg-white border rounded py-2 px-3 block w-full">
                      Spara
                    </button>
                    <button className="bg-white border rounded py-2 px-3 block w-full">
                      Ta bort
                    </button>
                    <button className="bg-white border rounded py-2 px-3 block w-full">
                      Flytta upp
                    </button>
                    <button className="bg-white border rounded py-2 px-3 block w-full">
                      Flytta ned
                    </button>
                    <label>
                      <div className="text-center pt-2">SortOrder</div>
                      <input
                        className="text-center w-28 py-1"
                        value={direction?.SortOrder}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg shadow-md bg-white p-3">
                  <label>
                    {!isEditing && (
                      <input type="checkbox" className="peer hidden" />
                    )}
                    <div className="peer-checked:text-gray-300">
                      {direction?.Direction}
                    </div>
                  </label>
                </div>
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
        <div>
          <textarea
            className="w-full p-3 rounded-lg shadow-md bg-white"
            placeholder="Add a direction"
          ></textarea>
          <div className="text-right mt-2">
            <button
              className="bg-slate-400 border rounded py-2 px-3 mr-2 disabled:opacity-25"
              // disabled={submitState === "pending"}
            >
              {/* {submitState === "pending" ? "Sparar..." : "Spara"} */}
              Spara
            </button>
            <button
              className="border rounded py-2 px-3 disabled:opacity-25"
              // disabled={submitState === "pending"}
              onClick={() => {
                // dispatch(setSelectedIngredientId(null));
                // onCancel?.();
                setIsAdding(false);
              }}
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : (
        <div className="text-right mt-2">
          <button
            className="shadow-md bg-white rounded-full w-7 h-7"
            onClick={() => setIsAdding(true)}
          >
            ＋
          </button>
        </div>
      )}
    </div>
  );
};

export default Directions;
