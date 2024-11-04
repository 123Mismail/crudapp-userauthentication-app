import {connenctDb} from "@/app/dbConfig/dbConfig"
import Topics from "@/app/model/topics"
import { NextRequest, NextResponse } from "next/server"

export const POST =async (req:NextRequest)=>{
    const {title ,description} =await req.json();
    await connenctDb();console.log
    await Topics.create({title ,description},{status:200})
    return   NextResponse.json({message:"data is added to database successfyully"},{status:201})
}
export const GET =async ()=>{
   
    await connenctDb();
   const topics= await Topics.find();
   return NextResponse.json({topics},{status:201})   
};

export const DELETE= async(req:NextRequest)=>{
   
    const id=req.nextUrl.searchParams.get("id");
    // await connectDb();
     await  Topics.findByIdAndDelete(id);
    return NextResponse.json({message:"deleted successfully!"},{status:200})

}