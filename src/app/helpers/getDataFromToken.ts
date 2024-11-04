import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"


const getDataFromToken = async(request:NextRequest) => {
     
  try {
    
    const token =request.cookies.get("token")?.value || ""; 
    console.log(token ,"token value at grtDataFfromTokens ")
    const decodeToken:any= jwt.verify(token ,process.env.NEXT_SECRET!);
    return decodeToken.id
  } catch (error:any) {
      return NextResponse.json({message:error.message},{status:500}) 
  }

}

export default getDataFromToken