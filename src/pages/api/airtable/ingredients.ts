import type { NextApiRequest, NextApiResponse } from "next";
import { minifyItems, ingredientsTable } from "@/utils/airtable";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const ingredientRecords = await ingredientsTable.select({}).firstPage();
    res.status(200).json(minifyItems(ingredientRecords));
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
