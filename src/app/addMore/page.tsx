"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import LogoutButton from '../logOutBtn'

const AddMore = () => {
 const [title , setTitle] =useState("")
 const [description ,setDescription] =useState("");
  const route= useRouter();
   const handelSubmit= async(e:any)=>{
         
    e.preventDefault();
    try {
       const response= await fetch("api/topics ",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({title ,description})

       })
       if(response.ok){
            route.push("/")
       }else{
        throw new Error("failed to create items try later.")
       }
    } catch (error) {
       console.log(error)
    }
   }

  //  logout route is handelling

    console.log(title,description,"title and description values re trying to fetch he")

 
  return (
    <div className='px-2'>
        <LogoutButton/>
        <form onSubmit={handelSubmit} > 
        <div className='space-y-2'>
          
            <input type="text" className='px-4 py-2 border border-black text-2xl font-semibold w-full'
            required
            placeholder='title'
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
            
              <input type="text" className='px-4 py-2 border border-black text-lg  w-full'
              required
              placeholder='description' 
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
              />
             
        </div>
        <button type='submit' className='px-4 py-2 bg-black text-white mt-2  text-xl font-semibold'>Add Item</button>
        </form>
        
    </div>
  )
}

export default AddMore