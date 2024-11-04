

import mongoose from "mongoose";

export async function connenctDb(){
 
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
       
        const connection=mongoose.connection
        connection.on("connected",()=>{
             
        });
        connection.on(("err"),(error)=>{
               console.log("mongo db connection error ,please mae sure the you database is up and runnung"+error)
        });
        // process.exit(); 

    } catch (error) {
        console.log("Something went wrong while connecting to the database!");
        console.log(error);
    }
}