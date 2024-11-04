'use client'
import React from 'react'
import { useState  } from 'react'
import {useRouter} from "next/navigation"
import LogoutButton from '../logOutBtn'
const EditForm = ({id,title,description}:any) => {
  // console.log(topics ,"title from list to Edit button")
    const [newTitle ,setNewTitle] =useState(title) ;
    const [newDescription ,setNewDescription] =useState(description)
   const router=useRouter();
   const handeledit=async(e:any)=>{
   e.preventDefault();
   const fetchfhApi = await fetch(`/api/topics/${id}`,{
   method:"PUT",
   headers:{"Content-type":"application/json"},
   body:JSON.stringify({newTitle,newDescription})
   })
   if(fetchfhApi.ok){
 
    router.refresh()
    router.push('/')
   }
   }

  return (
    <div>

      <LogoutButton/>
           <form onSubmit={handeledit} > 
        <div className='space-y-2'>
          
            <input type="text" className='px-4 py-2 border border-black text-2xl font-semibold w-full'
            required
            placeholder='title'
            onChange={(e)=>setNewTitle(e.target.value)}
            value={newTitle}
            />
            
              <input type="text" className='px-4 py-2 border border-black text-lg  w-full'
              required
              placeholder='description' 
              onChange={(e)=>setNewDescription(e.target.value)}
              value={newDescription}
              />
             
        </div>
        <button type='submit' className='px-4 py-2 bg-black text-white mt-2  text-xl font-semibold'>Save Changes</button>
        </form>
    </div>
  )
}

export default EditForm