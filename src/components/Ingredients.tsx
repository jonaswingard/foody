import { IAirtableRecord, IIngredientFields } from "@/interfaces";
import { selectAllIngredients } from "@/store/ingredientSlice";
import { FC } from "react";
import { useSelector } from "react-redux";

const Ingredients: FC<{ ingredientIds?: string[] }> = ({ ingredientIds }) => {
  const allIngredients = useSelector(selectAllIngredients);

  return ingredientIds?.length ? (
    <div className="p-3 rounded-lg shadow-md bg-white">
      <table className="w-64">
        <tbody>
          {ingredientIds
            .map(
              (ingredientId) =>
                allIngredients.find(
                  (ing) => ing.id === ingredientId
                ) as IAirtableRecord<IIngredientFields>
            )
            .sort((a, b) => {
              if (a.fields.Name > b.fields.Name) {
                return 1;
              }

              if (a?.fields.Name < b?.fields.Name) {
                return -1;
              }

              return 0;
            })
            ?.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient?.fields.Name}</td>
                <td>{ingredient?.fields.Quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Ingredients;
