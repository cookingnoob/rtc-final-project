import mongoose from "mongoose";

const connectToDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('conectado a la db')
    }catch(error){
        console.error(error)
    }
}

export default connectToDB