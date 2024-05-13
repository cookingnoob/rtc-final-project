import mongoose from "mongoose"
import List from "../models/lists.js"
import User from "../models/user.js"
import ToDo from "../models/to-dos.js"
//lists
const getGlobalLists = async (req, res, next) => {
  try {
    const globalLists = await List.find({ global: true })
    if (!globalLists) {
      res.status(404).json({ error: 'no se encontraron las listas' })
    }
    res.status(200).json({ data: globalLists })
  } catch (error) {
    next(error)
  }
}

const getUserLists = async (req, res, next) => {
  try {
    const { id } = req.user
    const lists = await List.find({ user: id })
    res.status(200).json({ data: lists })
  } catch (error) {
    next(error)
  }
}

const getListById = async (req, res, next) => {
  try {
    const { id } = req.params
    const list = await List.findById(id)
    if (!list) {
      const error = new Error('no esta esa lista')
      error.status = 404
      next(error)
    }
    const todos = await ToDo.find({ list: id })
    console.log(todos)
    res.status(200).json({ list, todos })
  } catch (error) {
    next(error)
  }
}

const postNewList = async (req, res, next) => {
  try {
    const { id } = req.user
    const { listName, color, global } = req.body
    const newList = new List({
      listName: listName,
      color: color,
      global: global
    })
    await newList.save()
    const currentUser = await User.findById(id);
    currentUser.lists.push(newList._id)
    await currentUser.save()
    res.status(201).json({ data: 'se creo una nueva lista', newList })
  } catch (error) {
    next(error)
  }
}

const patchEditList = async (req, res, next) => {
  try {
    const { id } = req.params
    const { listName, color, global } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('no se encontró la lista')
      error.status = 404
      next(error)
    }
    const doesListExist = await List.findOne({ _id: id })
    if (!doesListExist) {
      const error = new Error('no se encontró la lista')
      error.status = 404
      next(error)
    }
    await List.findOneAndUpdate({ _id: id }, {
      listName: listName,
      color: color,
      global: global
    })
    res.status(200).json({ data: 'se actulizo la lista' })
  } catch (error) {
    next(error)
  }
}
const deleteList = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('no se encontró la lista')
      error.status = 400
      next(error)
    }
    const doesListExist = await List.findOne({ _id: id })
    if (!doesListExist) {
      const error = new Error('no se encontró la lista')
      error.status = 404
      next(error)
    }
    await List.findOneAndDelete({ _id: id })
    res.status(200).json({ data: 'se eliminó la lista' })
  } catch (error) {
    next(error)
  }
}
//TO-DOS
//id es de la 
const addNewToDoToList = async (req, res, next) => {
  try {
    const { id } = req.params
    const { description, howMuchTimeItTakes, doneByXDate, notes, order } = req.body
    const newTodo = new ToDo({
      description: description,
      list: id,
      notes: notes,
      doneByXDate: doneByXDate,
      howMuchTimeItTakes: howMuchTimeItTakes,
      done: false,
      order: order,
      priority: false
    })
    await newTodo.save()
    res.status(201).json({ data: `se creo el archivo ${newTodo}` })
  } catch (error) {
    next(error)
  }
}




export { getGlobalLists, getUserLists, getListById, postNewList, patchEditList, deleteList, addNewToDoToList }