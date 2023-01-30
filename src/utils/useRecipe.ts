import useSWR from "swr";

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

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

export const useRecipes = () => {
  const { data, error, isLoading } = useSWR("/api/airtable", fetcher);

  return {
    recipeRecords: data as IRecipeRecord[],
    isLoading,
    isError: error,
  };
};
