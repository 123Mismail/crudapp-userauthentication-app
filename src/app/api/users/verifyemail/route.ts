
import {connenctDb} from "@/app/dbConfig/dbConfig";
import User from "@/app/userModel/user";
import { NextRequest, NextResponse } from "next/server";
connenctDb();
export const  POST=async(request:NextRequest)=>{

    try {
          const reqBody= await request.json();
          const {token}= reqBody;
 
          const user= await User.findOne({verifyToken:token, });
          
          //here we are getting the null 
          if(!user){
            return NextResponse.json({message:"token is invalid or or validity expires!"} ,{status:400})
          }

        //   or if we got the user then what we need to dio is to update some fields in the databse
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
            return NextResponse.json({message:"user verified successfylly!"},{status:201})
    } catch (error) {
         return NextResponse.json({message:"failed to verify user email"},{status:500});
    }
}

