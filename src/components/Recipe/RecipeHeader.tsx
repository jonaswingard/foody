import { FC } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { recipeSelectors } from "@/store/recipesSlice";
import { AppDispatch, AppState } from "@/store/store";

const RecipeHeader: FC<{ recipeId?: string | string[] }> = ({ recipeId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const recipe = useSelector((state: AppState) =>
    recipeSelectors.selectById(state, recipeId as string)
  );

  if (!recipe) {
    return null;
  }

  const { Name, Difficulty, Servings, TotalTime, URL } = recipe.fields;

  return (
    <header className="mt-5 mb-8 p-3 rounded-lg shadow-md bg-white">
      <div className="flex items-center mb-4">
        <h2 className="text-center flex-1 text-2xl">{Name}</h2>
        <Link href={`/recipe/edit/${recipe.id}`}>🛠️</Link>
      </div>
      <div className="flex gap-3 flex-wrap sm:flex-nowrap">
        <span>
          Portioner: <span className="italic">{Servings}</span>
        </span>
        <span>
          Tid: <span className="italic">{TotalTime ?? "?"}</span>
        </span>
        <span>
          Svårighetsgrad: <span className="italic">{Difficulty}</span>
        </span>
        {URL && (
          <span className="ml-auto">
            <a href={URL} target="_blank" rel="noreferrer">
              🔗 <span className="underline">Länk</span>
            </a>
          </span>
        )}
      </div>
    </header>
  );
};

export default RecipeHeader;
