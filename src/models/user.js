import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  avatar: {
    type: String,
  },
});

const User = mongoose.model("Users", userSchema);

export default User;
