import { FC, useState } from "react";
import { IIngredient } from "../interfaces";

const Selector: FC<{ onClick: () => void; ingredients?: IIngredient[] }> = ({
  onClick,
  ingredients,
}) => {
  return (
    <ul>
      {ingredients?.map((item) => (
        <li key={item.name}>
          <button
            className="py-2 px-5 hover:bg-blue-200 w-40 text-left"
            onClick={onClick}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Directions: FC<{
  directions?: string[];
  ingredients?: IIngredient[];
  isEditing: boolean;
}> = ({ directions = [], ingredients, isEditing }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  return (
    <>
      {visible && (
        <div
          className="fixed bg-white border mt-5"
          style={{ left: position.left, top: position.top }}
        >
          <Selector
            onClick={() => setVisible(false)}
            ingredients={ingredients}
          />
        </div>
      )}
      <ol className="">
        {directions?.map((direction) => (
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
        ))}
      </ol>
    </>
  );
};

export default Directions;
