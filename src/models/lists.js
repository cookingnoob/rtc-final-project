import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  listName: {
    type: String,
  },
  color: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  sharedUsers: [{ type: String }],
  global: Boolean,
  ratings: Number,
});

const List = mongoose.model("Lists", listSchema);

export default List;
