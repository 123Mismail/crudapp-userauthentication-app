
"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const route= useRouter();
   
      const handelLogout=async()=>{
        await axios.post("/api/users/logout");
    
      }
      const logout=()=>{
        handelLogout();
        route.push('/signin');
      }

  return (
    <button className='px-5 py-3 rounded-xl border my-2 text-right text-lg font-medium' onClick={logout}>Log Out</button>
  )
}

export default LogoutButton