import { FC } from "react";
import { IIngredient } from "../interfaces";

const Ingredients: FC<{ ingredients?: IIngredient[] }> = ({ ingredients }) => (
  <div className="p-3 rounded-lg shadow-md bg-white">
    <table className="w-64">
      <tbody>
        {ingredients
          ?.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            }

            return 0;
          })
          .map(({ amount, name }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{amount}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default Ingredients;
