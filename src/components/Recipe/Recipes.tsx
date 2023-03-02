import { FC, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  selectFetchState,
  sortedRecipes,
} from "@/store/recipesSlice";
import { AppDispatch } from "@/store/store";

const Loader = () => <div className="p-10 text-center text-7xl">⏳</div>;

const Recipes: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchState = useSelector(selectFetchState);
  const recipes = useSelector(sortedRecipes);

  useEffect(() => {
    if (fetchState === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, fetchState]);

  return (
    <>
      <h2 className="text-2xl mb-4">Alla recept</h2>
      <div className="p-5 rounded-lg shadow-md bg-white">
        {fetchState !== "fulfilled" ? (
          <Loader />
        ) : (
          <ul>
            {recipes
              .filter((recipe) => !!recipe?.id)
              .map(({ id, fields }: { id: string; fields: any }) => (
                <li key={id} className="mb-1">
                  <Link
                    className="text-lg underline underline-offset-2"
                    href={{
                      pathname: "/recipe/[id]",
                      query: { id },
                    }}
                  >
                    {fields.Name}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Recipes;
