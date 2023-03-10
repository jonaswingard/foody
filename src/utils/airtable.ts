import Airtable, { FieldSet, Records } from "airtable";

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  throw new Error("AIRTABLE_API_KEY and AIRTABLE_BASE_ID must be set");
}

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

export const recipesTable = base("Recipes");
export const ingredientsTable = base("Ingredients");
export const directionsTable = base("Directions");

export const minifyItems = (records: Records<FieldSet>) =>
  records.map((record) => {
    if (!record.fields.brought) {
      record.fields.brought = false;
    }

    return {
      id: record.id,
      fields: record.fields,
    };
  });
