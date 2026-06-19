import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connectdb = await mongoose.connect(process.env.MONGO_URI);

        console.log(process.env.MONGO_URI);

        console.log("mongodb cennected");
    }catch(error){
        console.log(error);
    }
}

export default connectDB;