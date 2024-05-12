import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema(
  {
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lists",
    },
    listName: String,
    description: String,
    done: Boolean,
    doneByXDate: Date,
    howMuchTimeItTakes: String,
    notes: String,
    order: Number,
    priority: Boolean,
  },
  { timestamps: true }
);

const ToDo = mongoose.model("Todo", toDoSchema);

export default ToDo;
