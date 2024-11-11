

import mongoose  from "mongoose";

type ConnectionObject={
    isConnected?:number
};

const connection:ConnectionObject ={};

export const connenctDb =async ():Promise<void> =>{

    if(connection.isConnected){
        console.log("Databse is lready connected !")
        return 
    }

    try {
         const dbConnect= await mongoose.connect(process.env.MONGODB_URI || "");
         console.log(dbConnect ,"databse connecton valuse is checking")
         connection.isConnected = dbConnect.connections[0].readyState;
         console.log("Databse is connected successfully!")
         console.log(connection ,"connectin object value is checking")
    } catch (error) {
        console.log("Failed to connect with database!")
        process.exit();
        
    }
}