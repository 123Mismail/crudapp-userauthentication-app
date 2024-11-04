


import {connenctDb} from "@/app/dbConfig/dbConfig";
import User from "@/app/userModel/user";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/app/helpers/getDataFromToken";


connenctDb();
export const  POST=async(request:NextRequest)=>{
         
    try {
         
         const userId=getDataFromToken(request);
         
         const user=await User.findById({_id:userId}).select("-password");
         return NextResponse.json({
            message:"User found!",
            data:user,
         })
    } catch (error:any) {
         return NextResponse.json({message:error.message},{status:500})
    }
}
