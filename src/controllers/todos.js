import ToDo from "../models/to-dos.js";

const patchToDoInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const { description, howMuchTimeItTakes, doneByXDate, notes, order, done } = req.body
    const patchedTodo = await ToDo.findByIdAndUpdate(id,
      { description, howMuchTimeItTakes, doneByXDate, notes, order, done },
      { new: true, runValidators: true })
    if (!patchedTodo) {
      const error = new Error('no se encontro el archivo')
      error.status = 404
      next(error)
    }
    res.status(200).json({ data: `se actualizo el recordatorio ${patchedTodo}` })
  } catch (error) {
    next(error)
  }
}
const deleteToDo = async (req, res, next) => {
  try {
    const { id } = req.params
    await ToDo.findByIdAndDelete(id)
    res.status(200).json({ data: 'se elimino el todo' })

  } catch (error) {
    next(error)
  }
}

export { deleteToDo, patchToDoInfo }