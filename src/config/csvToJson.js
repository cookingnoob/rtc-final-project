import { log } from "console";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

const readCsvFiles = (document) => {
  if (!document || document === "") {
    console.error("no especificaste el archivo csv a transformar");
    return;
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const csvFilePath = path.join(__dirname, ".", "csvs", `${document}`);

  const fileText = fs.readFileSync(csvFilePath);

  const convertDataTypes = (records) => {
    if (document === "users.csv") {
      return records.map((record) => {
        return {
          name: record.name,
          email: record.email,
          password: record.password,
          lists: record.lists.split(","),
          avatar: record.avatar,
        };
      });
    } else if (document === "lists.csv") {
      return records.map((record) => {
        return {
          listName: record.listName,
          color: record.color,
          user: record.user,
          sharedUsers: record.sharedUsers.split(","),
          global: Boolean(record.global),
          ratings: Number(record.ratings),
        };
      });
    } else if (document === "to-dos.csv") {
      return records.map((record) => {
        return {
          list: record.list,
          description: record.description,
          done: Boolean(record.done),
          doneByXDate: Date(record.doneByXDate),
          howMuchTimeItTakes: record.howMuchTimeItTakes,
          notes: record.notes,
        };
      });
    }
  };
  const records = parse(fileText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
    relax: true,
  });

  const recordWithType = convertDataTypes(records);

  const jsonText = JSON.stringify(recordWithType);
  const originalDocument = document.split(".");
  const documentName = originalDocument.shift();
  const seedsPath = path.join(__dirname, "seeds");
  const jsonFilePath = path.join(seedsPath, `${documentName}.js`);

  fs.writeFileSync(jsonFilePath, jsonText);

  return;
};

export { readCsvFiles };
