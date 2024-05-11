import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
    },
    color: String,
    userName: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    global: Boolean,
    ratings: Number,
  },
  { timestamps: true }
);

const List = mongoose.model("Lists", listSchema);

export default List;
