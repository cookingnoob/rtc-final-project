import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  listID: {
    type: Number,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lists",
  },
  description: String,
  done: Boolean,
  doneByXDate: String,
  howMuchTimeItTakes: String,
  notes: String,
  files: String,
});

const ToDo = mongoose.model("Todos", toDoSchema);

export default ToDo;
