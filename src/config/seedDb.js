import dotenv from "dotenv";
import dotenv from "dotenv";
import List from "../models/lists.js";
import ToDo from "../models/to-dos.js";
import User from "../models/user.js";
import connectToDB from "./connectDB.js";
import { listSeeds } from "./seeds/lists.js";
import { todosSeeds } from "./seeds/to-dos.js";
import { userSeeds } from "./seeds/users.js";
import connectToDB from "./connectDB.js";

const seedDB = async () => {
  try {
    await Promise.all([
      List.deleteMany({}),
      ToDo.deleteMany({}),
      User.deleteMany({}),
    ]);
    console.log("se limpiaron las bases List, Todo y Recipes");

    await User.insertMany(userSeeds);
    console.log("se subieron las seeds de usuarios");

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
      const user = await User.findOne({ name: list.userName });
      if (user) {
        await List.findByIdAndUpdate(list._id, {
          $set: { user: user._id },
          $unset: { userName: "" },
        });
        console.log(
          `se actualizo la lista ${list.listName} con el id del usuario`
        );
      }
    }
  } catch (error) {
    console.error(`no se pudo ligar los usuarios a las listas ${error}`);
  }
};

const linkToDosToLists = async () => {
  try {
    const todos = await ToDo.find();
    for (let todo of todos) {
      const list = await List.findOne({ listName: todo.listName });
      if (list) {
        await ToDo.findByIdAndUpdate(todo._id, {
          $set: { list: list._id },
          $unset: { listName: "" },
        });
        console.log(`se ligo ${todo.description} a la lista ${list.listName}.`);
      }
    }
  } catch (error) {
    console.error(
      `no se pudo enlazar el todo ${todo.description} con la lista ${todo.listName}`
    );
  }
};

const seedFlow = async () => {
  try {
    dotenv.config();
    await connectToDB();
    await seedDB();
    await linkUserIdToLists();
    await linkToDosToLists();
    console.log("ya concluyo el proceso de seeding y relacionar modelos");
  } catch (error) {
    console.error(error);
  }
};

seedFlow()