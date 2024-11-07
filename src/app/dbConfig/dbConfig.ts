


import mongoose from "mongoose";

// Set the max listeners limit if needed
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

let isConnected = false;

export async function connenctDb() {
    // Check if already connected
    if (isConnected) {
        console.log("You are already connected to the database.");
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
             
             
            connectTimeoutMS: 20000, // 20 seconds
            socketTimeoutMS: 20000, // 20 seconds
        });

        isConnected = true;
        console.log("Database connection established successfully!");

        // Add event listeners once after connection is successful
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully!");
        });

        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error. Please ensure your database is running: " + error);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected!");
            isConnected = false;
        });

    } catch (error) {
        console.error("Error while connecting to the database:", error);
    }
}