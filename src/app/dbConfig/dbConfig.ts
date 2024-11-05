

// import mongoose from "mongoose";
//  let isConnected=false;
// export async function connenctDb(){
 
//     try {
//         if(isConnected){
//             return  console.log("you are already connected to the database");
//         }else{
//             await mongoose.connect(process.env.MONGODB_URI!)
       
//             const connection=mongoose.connection
//             connection.on("connected",()=>{
//                   console.log("databse is connected successfully!")
//                   isConnected=true;
//             });
//             connection.on(("err"),(error)=>{
//                    console.log("mongo db connection error ,please mae sure the you database is up and runnung"+error)
//             });
//         }
      
//         // process.exit(); 

//     } catch (error) {
//         console.log("Something went wrong while connecting to the database!");
//         console.log(error);
//     }
// }


import mongoose from "mongoose";

// Optional: Set max listeners limit globally, if needed
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

export async function connenctDb() {
    if (mongoose.connection.readyState === 1) {
        console.log("You are already connected to the database.");
        return;
    }
  
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        console.log("Database connection established successfully!");

    } catch (error) {
        console.error("Something went wrong while connecting to the database!");
        console.error(error);
    }
}

// Attach event listeners only once
if (mongoose.connection.readyState === 0) {  // Avoid re-adding listeners if already connected
    mongoose.connection.on("connected", () => {
        console.log("Database is connected successfully!");
    });

    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error. Please make sure your database is running: " + error);
    });
}
