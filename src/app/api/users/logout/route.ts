


import {connenctDb} from "@/app/dbConfig/dbConfig";
import User from "@/app/userModel/user";
import { NextRequest, NextResponse } from "next/server";
 


connenctDb();
export const  POST=async(request:NextRequest)=>{

    try {
        const response= NextResponse.json({
            message:"User logout successully!"
        },
    {status:200});
    response.cookies.set("token","",{
        httpOnly:true,
        expires: new Date(0),
    })
    return response;
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}