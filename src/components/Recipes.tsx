import { FC, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  allRecipes,
  fetchRecipes,
  selectFetchState,
} from "@/store/recipesSlice";
import { AppDispatch } from "@/store/store";

const Loader = () => <div className="p-10 text-center text-7xl">⏳</div>;

const Recipes: FC = () => {
  const recipeRecords = useSelector(allRecipes);
  const dispatch = useDispatch<AppDispatch>();
  const fetchState = useSelector(selectFetchState);

  useEffect(() => {
    console.log(recipeRecords);
  }, [recipeRecords]);

  useEffect(() => {
    if (fetchState === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, fetchState]);

  return (
    <div className="bg-white p-5 shadow">
      <h2 className="py-5 text-2xl">Recept</h2>
      <Link className="block underline underline-offset-2 mb-4" href="/types">
        Visa recept efter typ
      </Link>

      {fetchState !== "fulfilled" ? (
        <Loader />
      ) : (
        <ul>
          {recipeRecords
            .sort((a, b) => {
              if (a.fields.Name > b.fields.Name) {
                return 1;
              } else if (a.fields.Name < b.fields.Name) {
                return -1;
              }
              return 0;
            })
            .map(({ id, fields }: { id: string; fields: any }) => (
              <li key={id}>
                <Link
                  className="underline underline-offset-2"
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
  );
};

export default Recipes;
