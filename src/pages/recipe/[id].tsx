import Base from "@/components/Base";
import Directions from "@/components/Directions";
import Ingredients from "@/components/Ingredients";
import { IRecipe } from "@/interfaces";
import { addIngredientsToDirection } from "@/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import data, { directionMappings } from "../../data/data";

const Recipe = () => {
  const router = useRouter();
  const recipeId = router.query.id;
  const [isEditing, setIsEditing] = useState(false);
  const { difficulty, directions, ingredients, name, servings, totalTime } =
    (data.find((d) => d.id === recipeId) || {}) as IRecipe;

  const mappings = directionMappings.find((d) => d.id === recipeId);

  return (
    <Base>
      <>
        <header className="mt-5 mb-8 p-3 rounded-lg shadow-md bg-white">
          <div className="flex items-center mb-4">
            <h2 className="text-center flex-1 text-2xl">{name}</h2>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "✅" : "🛠️"}
            </button>
          </div>
          <div className="flex gap-3">
            <span>
              Portioner: <span className="italic">{servings}</span>
            </span>
            <span>
              Tid: <span className="italic">{totalTime}</span>
            </span>
            <span>
              Svårighetsgrad: <span className="italic">{difficulty}</span>
            </span>
          </div>
        </header>

        <section className="flex gap-5 flex-wrap md:flex-nowrap">
          <aside className="">
            <h3>Ingredienser</h3>
            <Ingredients ingredients={ingredients} />
          </aside>
          <section>
            <h3>Beskrivning</h3>
            {directions && (
              <Directions
                directions={directions.map(
                  (direction, index) =>
                    addIngredientsToDirection(
                      direction,
                      index,
                      mappings?.mappings,
                      ingredients
                    ) || direction
                )}
                ingredients={ingredients}
                isEditing={isEditing}
              />
            )}
          </section>
        </section>
      </>
    </Base>
  );
};

export default Recipe;
