import type { NextApiRequest, NextApiResponse } from "next";
import { minifyItems, directionsTable } from "@/utils/airtable";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const directionRecords = await directionsTable
      .select({
        view: "Grid view",
      })
      .firstPage();
    res.status(200).json(minifyItems(directionRecords));
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
