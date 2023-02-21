import { IAirtableRecord, IIngredientFields } from "@/interfaces";
import {
  resetSubmitState,
  selectSelectedIngredient,
  selectSubmitState,
  setSelectedIngredientId,
} from "@/store/ingredientSlice";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditRecipe from "./IngredientForm";

const Ingredients: FC<{
  ingredients: IAirtableRecord<IIngredientFields>[];
}> = ({ ingredients }) => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const submitState = useSelector(selectSubmitState);

  useEffect(() => {
    if (!selectedIngredient) {
      setIsEdit(false);
    }
  }, [selectedIngredient]);

  useEffect(() => {
    if (submitState === "fulfilled") {
      dispatch(resetSubmitState());
      dispatch(setSelectedIngredientId(null));
    }
  }, [dispatch, submitState]);

  return ingredients?.length ? (
    <div className="p-3 rounded-lg shadow-md bg-white">
      <table className="w-64">
        <tbody>
          {ingredients
            .sort((a, b) => {
              if (a.fields.Name > b.fields.Name) {
                return 1;
              }

              if (a?.fields.Name < b?.fields.Name) {
                return -1;
              }

              return 0;
            })
            .map((ingredient) => {
              const shouldShowEdit =
                isEdit && ingredient.id === selectedIngredient?.id;

              return (
                <tr key={ingredient.id}>
                  {shouldShowEdit ? (
                    <td colSpan={2}>
                      <EditRecipe />
                    </td>
                  ) : (
                    <>
                      <td>
                        <button
                          onClick={() => {
                            // dispatch(setSelectedIngredientId(null));
                            // setTimeout(() => {
                            // }, 100);
                            console.log("clicked", ingredient.id);

                            setIsEdit(true);
                            dispatch(setSelectedIngredientId(ingredient.id));
                          }}
                        >
                          {ingredient?.fields.Name}
                        </button>
                      </td>
                      <td>{ingredient?.fields.Quantity}</td>
                    </>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
      {isAdd ? (
        <section>
          <h3 className="font-medium mt-5">Lägg till ingrediens</h3>
          <EditRecipe isAdding onCancel={() => setIsAdd(false)} />
        </section>
      ) : (
        <div className="text-right mt-2">
          <button
            className="bg-slate-300 rounded-full w-7 h-7"
            onClick={() => setIsAdd(true)}
          >
            ＋
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default Ingredients;
