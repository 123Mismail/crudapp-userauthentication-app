"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import LoadingPage from '@/app/loadingPage'
import Link from 'next/link'

const VerifyEmail = () => {
       const [token , setToken]=useState("")
       const [isVerified ,setVerified]=useState(false);
       const [loading ,setLoading]=useState(false);
    const veryfyEmailHandeler= async()=>{
        try {
                await axios.post("/api/users/verifyemail",token)
        } catch (error) {
            console.log(error);
        }
    }
// const route=useRouter();
 
    useEffect(()=>{

     const urlToken=   window.location.search.split("=")[1];
     if(isVerified){
        setToken(urlToken)
        veryfyEmailHandeler();
        // route.push('/signin')
        setVerified(false)
     }
 
    },[])
  return (
    <div className='relative flex flex-col justify-center items-center p-2'>
        <h2 className='text-2xl font-semibold '>Verify Your Email  </h2>
      <button className='px-6 py-3 text-xl font-medium mt-20 border rounded-xl shadow-xl'
      onClick={()=>{setVerified(!isVerified)}}
      >
        {isVerified ? "User Verified successully!" :" click to verify email"}
      </button>
      
      {isVerified && 
     <Link href={'/signin'}> <button className='px-6 py-3 border rounded-xl mt-8 text-lg font-medium' onClick={()=>setLoading(true)}>  Sign in </button></Link>
      } 
      { token && loading ?  <LoadingPage/> : "" }
    </div>
  )
}

export default VerifyEmail