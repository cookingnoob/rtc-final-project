import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  listID: Number,
  description: String,
  done: Boolean,
  doneByXDate: String,
  howMuchTimeItTakes: String,
  notes: String,
  files: String,
});

const ToDo = mongoose.model("Todos", toDoSchema);

export default ToDo;
