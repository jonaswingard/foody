import type { NextApiRequest, NextApiResponse } from "next";
import { recipesTable, minifyItems } from "@/utils/airtable";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const recipeRecords = await recipesTable.select({}).firstPage();
    res.status(200).json(minifyItems(recipeRecords));
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
