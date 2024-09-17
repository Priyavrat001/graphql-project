import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI

const connectToMongo = ()=>{
    mongoose.connect(uri).then(c=> console.log(`MongoDB is connected ${c.connection.name}`)).catch(err=>console.error(err))
}

export {connectToMongo};