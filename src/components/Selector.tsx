import { IIngredient } from "@/interfaces";
import { FC } from "react";

export const Selector: FC<{
  onClick: () => void;
  ingredients?: IIngredient[];
}> = ({ onClick, ingredients }) => {
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
