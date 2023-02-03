import type { NextApiRequest, NextApiResponse } from "next";
import { recipesTable, minifyItems } from "@/utils/airtable";
import { FieldSet } from "airtable";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await new Promise(() => {
      recipesTable.create(
        [{ fields: req.body as FieldSet }],
        function (err, records) {
          if (err) {
            console.error(err);
            res.status(500).json({ msg: "Something went wrong! 😕" });
          } else {
            res.status(200).json(records);
          }
        }
      );
    });
  } else if (req.method === "DELETE") {
    await new Promise(() => {
      recipesTable.destroy(req.body, function (err, deletedRecord) {
        if (err) {
          console.error(err);
          res.status(500).json({ msg: "Something went wrong! 😕" });
        } else {
          res.status(200).json(deletedRecord);
        }
      });
    });
  }
};
