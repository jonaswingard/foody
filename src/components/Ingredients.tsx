import { IAirtableRecord, IIngredientFields } from "@/interfaces";
import {
  selectSelectedIngredient,
  setSelectedIngredientId,
} from "@/store/ingredientSlice";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditRecipe from "./IngredientForm";

const Ingredients: FC<{
  ingredients: IAirtableRecord<IIngredientFields>[];
}> = ({ ingredients }) => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

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
            .map((ingredient) => (
              <tr key={ingredient.id}>
                {isEdit && ingredient.id === selectedIngredient?.id ? (
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

                          dispatch(setSelectedIngredientId(ingredient.id));
                          setIsEdit(true);
                        }}
                      >
                        {ingredient?.fields.Name}
                      </button>
                    </td>
                    <td>{ingredient?.fields.Quantity}</td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {isAdd && (
        <section>
          <div className="text-right">
            <button
              className="bg-slate-300 rounded-full w-7 h-7"
              onClick={() => setIsAdd(true)}
            >
              ＋
            </button>
          </div>

          <h3>Lägg till ingrediens</h3>
          <EditRecipe />
        </section>
      )}
    </div>
  ) : null;
};

export default Ingredients;
