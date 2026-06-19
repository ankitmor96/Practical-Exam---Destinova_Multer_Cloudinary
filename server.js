import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import router from "./routes/packageRoutes.js";
import dotenv from "dotenv";

dotenv.config({path:"./.env"});

const app = express();

app.use(express.json());

app.get("/",(req , res , next)=>{
    res.send("hello from server");
});

app.use("/Packages", router);

app.use((req,res,next)=>{
    return next (new HttpError("routes not found",404));
});

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }
    res.status(error.statusCode || 500).json({
        message:error.message || "internal server error"
    });
});

async function StartServer(){
    try{
        await connectDB();

        const port = process.env.PORT || 5000;

        app.listen(port,(error)=>{
            if(error){
                console.log(error);
            }
            console.log(`server has runing on ${port}`);
        });
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
};

StartServer();