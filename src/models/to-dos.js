import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  list: String,
  description: String,
  done: Boolean,
  doneByXDate: Date,
  howMuchTimeItTakes: String,
  notes: String,
});

const ToDo = mongoose.model("Todos", toDoSchema);

export default ToDo;
