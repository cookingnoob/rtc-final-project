import List from "../models/lists.js"

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

export { getGlobalLists }