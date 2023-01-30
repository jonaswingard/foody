import Airtable, { FieldSet, Records } from "airtable";

if (
  !process.env.AIRTABLE_API_KEY ||
  !process.env.AIRTABLE_BASE_ID ||
  !process.env.AIRTABLE_TABLE_NAME
) {
  throw new Error(
    "AIRTABLE_API_KEY, AIRTABLE_BASE_ID and AIRTABLE_TABLE_NAME must be set"
  );
}

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Reference a table
const table = base(process.env.AIRTABLE_TABLE_NAME);

const minifyItems = (records: Records<FieldSet>) =>
  records.map((record) => {
    if (!record.fields.brought) {
      record.fields.brought = false;
    }

    return {
      id: record.id,
      fields: record.fields,
    };
  });

export { table, minifyItems };