import List from "../models/lists.js";
import ToDo from "../models/to-dos.js";
import User from "../models/user.js";
import { listSeeds } from "./seeds/lists.js";
import { toDoSeeds } from "./seeds/to-dos.js";
import { userSeeds } from "./seeds/users.js";

const seedDB = async (cleanDB) => {
  try {
    if (cleanDB === true) {
      try {
        await Promise.all([
          List.deleteMany({}),
          ToDo.deleteMany({}),
          User.deleteMany({}),
        ]);
        console.log("se limpiaron las bases List, Todo y Recipes");
      } catch (error) {
        console.error(`no se pudo limpiar la db ${error}`);
      }
    }

    await List.insertMany(listSeeds);
    console.log("se subieron las seeds de List");

    await ToDo.insertMany(toDoSeeds);
    console.log("se subieron las seeds de To dos");

    await User.insertMany(userSeeds);
    console.log("se subieron las seeds de List");
  } catch (error) {
    console.error(`no se pudo poblar la db ${error}`);
  }
};

export default seedDB;
