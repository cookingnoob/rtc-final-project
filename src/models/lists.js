import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  listName: {
    type: String,
  },
  color: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sharedUsers: [{ type: String }],
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  }],
  global: Boolean,
  ratings: Number,
});

const List = mongoose.model("Lists", listSchema);

export default List;
