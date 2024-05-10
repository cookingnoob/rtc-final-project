import dotenv from "dotenv";
import List from "../models/lists.js";
import ToDo from "../models/to-dos.js";
import User from "../models/user.js";
import connectToDB from "./connectDB.js";
import { listSeeds } from "./seeds/lists.js";
import { todosSeeds } from "./seeds/to-dos.js";
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

    await ToDo.insertMany(todosSeeds);
    console.log("se subieron las seeds de To dos");

    await User.insertMany(userSeeds);
    console.log("se subieron las seeds de User");
  } catch (error) {
    console.error(`no se pudo poblar la db ${error}`);
  }
};


const linkUserIdToLists = async () => {
  const lists = await List.find();

  try {
    for (const list of lists) {
      const user = await User.findOne({ name: list.user });
      list.user = user._id;
      await list.save();
      console.log("se guardo el id del usuario en la lista");
    }
  } catch (error) {
    console.error(`no se pudo ligar los usuarios a las listas ${error}`);
  }
};

const linkToDosToLists = async () => {
  const toDos = await ToDo.find();

  try {
    for (const todo of toDos) {
      const list = await List.findOne({ id: todo.listID });
      todo.list = list._id;

      await todo.save();
      console.log("se guardaron los id de las listas a los todos");
    }
  } catch (error) {
    console.error(`no se pudo ligar las listas a los todos ${error}`);
  }
};

const seedFlow = async () => {
  dotenv.config();
  await connectToDB()
  await seedDB()
  await linkUserIdToLists()
  linkToDosToLists()
}

seedFlow()