import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    // favorites:[] 
    // userComments: []
})

const User = mongoose.model('users', userSchema)

export default User