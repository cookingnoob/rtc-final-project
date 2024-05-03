import List from "../models/lists.js"
import User from "../models/user.js"

const getGlobalLists = async (req, res, next) => {
  try {
    const globalLists = await List.find({ global: true })
    if (!globalLists) {
      res.status(404).json({ error: 'no se encontraron las listas' })
    }
    res.status(201).json({ data: globalLists })
  } catch (error) {
    next(error)
  }
}

const getUserLists = async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await User.findOne({ _id: id }).populate('lists')
    res.status(200).json({ data: user.lists })
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
    const listToUpdate = await List.findOneAndUpdate({ _id: id }, {
      listName: listName,
      color: color,
      global: global
    })
    if (!listToUpdate) {
      const error = new Error('no se encontró la lista')
      error.status = 400
      next(error)
    }
    res.status(200).json({ data: 'se actulizo la lista', listToUpdate })
  } catch (error) {
    next(error)
  }
}

export { getGlobalLists, getUserLists, postNewList, patchEditList }