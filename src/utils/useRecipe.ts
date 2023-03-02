import { IAirtableRecord, IRecipeFields } from "@/interfaces";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

export const useRecipes = () => {
  const { data, error, isLoading } = useSWR("/api/airtable", fetcher);

  return {
    recipeRecords: data as IAirtableRecord<IRecipeFields>[],
    isLoading,
    isError: error,
  };
};
