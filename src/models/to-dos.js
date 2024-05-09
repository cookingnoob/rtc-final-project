import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lists",
  },
  description: String,
  done: Boolean,
  doneByXDate: Date,
  howMuchTimeItTakes: String,
  notes: String,
});

const ToDo = mongoose.model("Todo", toDoSchema);

export default ToDo;
