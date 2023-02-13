import type { NextApiRequest, NextApiResponse } from "next";
import { recipesTable, minifyItems, ingredientsTable } from "@/utils/airtable";
import { FieldSet } from "airtable";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await new Promise(() => {
      ingredientsTable.create(
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
  } else if (req.method === "PUT") {
    await new Promise(() => {
      ingredientsTable.update(
        [req.body as { id: string; fields: FieldSet }],
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
      ingredientsTable.destroy(
        req.body as string,
        function (err, deletedRecord) {
          if (err) {
            console.error(err);
            res.status(500).json({ msg: "Something went wrong! 😕" });
          } else {
            res.status(200).json(deletedRecord);
          }
        }
      );
    });
  }
};
