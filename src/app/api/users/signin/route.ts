

import {connenctDb} from "@/app/dbConfig/dbConfig";
import User from "@/app/userModel/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";  
import jwt from "jsonwebtoken";

interface Token{
    id:string;
    username:string;
    email:string
}
connenctDb();
export const  POST=async(request:NextRequest)=>{
    
    try {
            const reqBody=await request.json();
            const {email , password} =reqBody;
            const user= await User.findOne({email});
          
            if(!user){
                return NextResponse.json({message:"Check your credentials !"},{status:402});
            }
     const verifiedByPassword=await bcryptjs.compare(password ,user.password);
   
     if(!verifiedByPassword){
        return NextResponse.json({message:"invalid password ! check your credentials ."},{status:400})
     }
    //  if found any user then
    // now we will make the jwt token here
    const tokenData:Token ={
        id:user._id,
        username:user.userName,
        email:user.email,
    }
   
        const token=  jwt.sign(tokenData,process.env.NEXT_SECRET!,{expiresIn:"1d"});
        console.log(token ,"token value is trying to find in signin route")
        const response=NextResponse.json({
            message:"Logged In Successfully!",
            success:true,

        });
        response.cookies.set("token",token ,{httpOnly:true});
        return response;

        
           // we will also handel the cookies 
         
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}
