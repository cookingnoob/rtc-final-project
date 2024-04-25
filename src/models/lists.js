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
    type: String,
  },
  sharedUsers: [{ type: String }],
  global: Boolean,
  ratings: Number,
});

const List = mongoose.model("Lists", listSchema);

export default List;
