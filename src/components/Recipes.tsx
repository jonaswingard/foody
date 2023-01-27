import Link from "next/link";
import { FC } from "react";

import data from "../data/data";

const Recipes: FC = () => (
  <div className="bg-white p-5 shadow">
    <h2 className="py-5 text-2xl">Recept</h2>
    <Link className="block underline underline-offset-2 mb-4" href="/types">
      Visa recept efter typ
    </Link>
    <ul>
      {data
        .sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        .map(({ id, name }) => (
          <li key={id}>
            <Link
              className="underline underline-offset-2"
              href={`/recipe/${id}`}
            >
              {name}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

export default Recipes;