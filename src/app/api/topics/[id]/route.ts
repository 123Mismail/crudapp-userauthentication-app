
import {connenctDb} from "@/app/dbConfig/dbConfig"
import Topics from "@/app/model/topics"
import { NextRequest, NextResponse } from "next/server"

export const PUT=async(req:NextRequest ,{params}:any)=>{

    const {id}=params;
    const {newTitle:title , newDescription:description}= await req.json();// here we are storing title into newtitle and description into newDescription
    await connenctDb()
    await Topics.findByIdAndUpdate(id,{title,description});// here we are passing the values and id of that value which wee have to delete form the database
    return NextResponse.json({message:"updated successfully!"},{status:201});

}

// now getting the individual  topics by id which will be usefull i update component of our code 
export const GET=async(request:NextRequest,{params}:any)=>{

    const {id}=params;
    await connenctDb();
     const topic= await Topics.findOne({_id:id});
   
     if(topic){
        console.log("data is etched byb id successfully!")
     }else{
        console.log("there is some issues while fetching data by id")
     }
    return NextResponse.json({topic} ,{status:201})

}