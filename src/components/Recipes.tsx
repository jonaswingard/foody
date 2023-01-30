import Link from "next/link";
import { FC, useEffect, useState } from "react";
import data from "../data/data";

interface IRecipeFields {
  Servings: number;
  Difficulty: string;
  Name: string;
  brought: boolean;
}

interface IRecipeRecord {
  id: string;
  fields: IRecipeFields;
}

const Loader = () => <div className="p-10 text-center text-7xl">⏳</div>;

const Recipes: FC = () => {
  // TODO: lägga till laddning
  const [recipeRecords, setRecipeRecords] = useState<IRecipeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/airtable");
        const data = await response.json();
        setRecipeRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-white p-5 shadow">
      <h2 className="py-5 text-2xl">Recept</h2>
      <Link className="block underline underline-offset-2 mb-4" href="/types">
        Visa recept efter typ
      </Link>
      {isLoading && <Loader />}
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
                href={`/recipe/${id}`}
              >
                {fields.Name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Recipes;
