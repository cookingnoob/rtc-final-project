import List from "../models/lists.js";
import ToDo from "../models/to-dos.js";
import User from "../models/user.js";
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
    console.log("se subieron las seeds de List");
  } catch (error) {
    console.error(`no se pudo poblar la db ${error}`);
  }
};

const linkListsToUser = async () => {
  const users = await User.find();
  try {
    for (const user of users) {
      const lists = await List.find({ user: user.name });
      const listIDs = lists.map((list) => list._id);
      user.lists = listIDs;

      await user.save();
      console.log("se actualizo la id de las listas en los usuarios");
    }
  } catch (error) {
    console.error(`no se pudo ligar usuarios a las listas ${error}`);
  }
};

const linkUserIdToLists = async () => {
  const lists = await List.find();

  // lists.map((list) => console.log(`id de la lista ${list._id}`));
  // users.map((user) => console.log(`id de usuarios listas ${user.lists}`));

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

const linkListtoTodo = async () => {
  const lists = await List.find({ global: true })
  try {
    for (const l of lists) {
      const listToDos = []
      const toDos = await ToDo.find({ list: l._id })
      toDos.map(todo => listToDos.push(todo._id))
      l.todos = listToDos
      await l.save()
      console.log('se ligaron los to-dos a las seed de listas')
    }

  } catch (error) {
    console.error(`no se pudieron ligar los to do a las listas ${error}`)
  }
}

const deleteKeys = async () => {
  try {
    const toDos = await ToDo.find();
    toDos.forEach((todo) => console.log(todo.id));
  } catch (error) {
    console.error(`error al borrar las claves ${error}`);
  }
};
export {
  seedDB,
  linkListsToUser,
  linkUserIdToLists,
  linkToDosToLists,
  linkListtoTodo,
  deleteKeys,
};
