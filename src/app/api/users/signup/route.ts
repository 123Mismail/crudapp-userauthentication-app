
import {connenctDb} from "@/app/dbConfig/dbConfig";
import User from "@/app/userModel/user";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/app/helpers/mailer";
import bcryptjs from "bcryptjs"; 
connenctDb();
export const  POST=async(request:NextRequest)=>{
      
   
    try {
           
          const { userName,email , password}= await request.json();
          console.log(email,"user in signup page")
          const user= await User.findOne({email});
           
          if(user){
             
            return NextResponse.json({message:"user email already exist"},{status:500});
          }
          const hashedPass= await bcryptjs.hash(password,10);

         const newUser = new User({userName,email,password:hashedPass});

        const savedUser= await newUser.save(); 
        
        await sendMail({email,emailType:"VERIFY",userId:savedUser._id})// here we are giving the require props to the sendmail method and savedUser._id is coming from data base where we found the _id property there
           return NextResponse.json({message:"data is added to database successfully"},{status:200});
    } catch (error:any) {
         console.log("error in route signup page ",error);

         return NextResponse.json({message:error.message},{status:500})
          
         
    }

}