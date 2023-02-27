import {
  addDirection,
  deleteDirection,
  selectAllDirections,
  selectSubmitState,
  updateDirection,
} from "@/store/directionsSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAirtableRecord, IDirectionFields, IIngredient } from "../interfaces";

const Directions: FC<{
  // directionIds?: string[];
  directions: IAirtableRecord<IDirectionFields>[];
  isEditing: boolean;
}> = ({ directions, isEditing }) => {
  const router = useRouter();
  const recipeId = router.query.id;
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const submitState = useSelector(selectSubmitState);
  const dispatch = useDispatch<AppDispatch>();

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
        {directions
          .sort((a, b) => {
            if (a.fields.SortOrder > b.fields.SortOrder) {
              return 1;
            } else if (a.fields.SortOrder < b.fields.SortOrder) {
              return -1;
            }
            if (!a.fields.SortOrder || !b.fields.SortOrder) {
              console.log(a, b);
            }

            return 0;
          })
          .map((direction, index) => (
            <li className="mb-4" key={index}>
              {isAdding ? (
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();

                    const postData = Object.assign(
                      {},
                      ...Array.from(new FormData(e.target as HTMLFormElement))
                        .filter(([_key, value]) => value)
                        .map(([key, value]) => ({ [key]: value }))
                    ) as IDirectionFields;

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
                    <button className="bg-white border rounded py-2 px-3 block w-full">
                      Spara
                    </button>
                    <button
                      type="button"
                      className="bg-white border rounded py-2 px-3 block w-full"
                      onClick={() => {
                        dispatch(deleteDirection(direction.id));
                      }}
                    >
                      Ta bort
                    </button>
                    <button
                      type="button"
                      className="bg-white border rounded py-2 px-3 block w-full"
                    >
                      Flytta upp
                    </button>
                    <button
                      type="button"
                      className="bg-white border rounded py-2 px-3 block w-full"
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
              ) : (
                <div className="rounded-lg shadow-md bg-white p-3">
                  <label>
                    {!isEditing && (
                      <input type="checkbox" className="peer hidden" />
                    )}
                    <div className="peer-checked:text-gray-300">
                      {direction.fields.Direction}
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
        <form
          className="text-right mt-2"
          onSubmit={(e) => {
            e.preventDefault();

            const postData = Object.assign(
              {},
              ...Array.from(new FormData(e.target as HTMLFormElement))
                .filter(([_key, value]) => value)
                .map(([key, value]) => ({ [key]: value }))
            ) as IDirectionFields;

            dispatch(
              addDirection({
                ...postData,
                SortOrder: 99,
                Recipes: [recipeId as string],
              })
            );
            // }
          }}
        >
          <textarea
            className="w-full p-3 rounded-lg shadow-md bg-white"
            name="Direction"
            placeholder="Add a direction"
          />
          <div>
            <button
              className="bg-slate-400 border rounded py-2 px-3 mr-2 disabled:opacity-25"
              disabled={submitState === "pending"}
            >
              {submitState === "pending" ? "Lägger till..." : "Lägg till"}
            </button>
            <button
              className="border rounded py-2 px-3 disabled:opacity-25"
              disabled={submitState === "pending"}
              onClick={() => {
                setIsAdding(false);
              }}
            >
              Avbryt
            </button>
          </div>
        </form>
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
