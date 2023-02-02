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

  return (
    <>
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
            <li className="mb-4 p-3 rounded-lg shadow-md bg-white" key={index}>
              <label className="flex gap-2">
                {!isEditing && (
                  <input type="checkbox" className="peer hidden" />
                )}
                <div className="peer-checked:text-gray-300">
                  {direction?.Direction}
                </div>
              </label>
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
    </>
  );
};

export default Directions;
