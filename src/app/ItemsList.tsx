"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import DeleteBtn from './components/deleteBtn'
import LoadingPage from './loadingPage'
 
const ItemsList = () => {
    const [loading , setLoading] = useState(false)
    const [items , setItems] =useState<any>([])
    const fetchData=async()=>{
       try {
        const response=await fetch('/api/topics',{
            method:"GET",
            cache:"no-store"
             });
             const data= await response.json();
             const filterData=data.topics.filter((topic:any)=> topic.title);
            //  console.log(data.topics ,"data ")
             setItems(filterData)
       } catch (error) {
         console.log(error)
       }
        // console.log(data ,"fetching data from data base")
    }
     const loadData=async ()=>{
      setLoading(false);
     await  fetchData()
    setLoading(false)
     }
   
     
   useEffect(()=>{
    loadData();
   },[items]);
      
  return (
    <div className='relative'>
 
              {loading ? <div className='flex justify-center items-center '>
                <p className='text-lg '>
                   Loading data please wait
                </p>
              </div>: <div>
                            {items &&  items.map((item:any)=>(
                              // {item.title !== "" && }
                               <div key={item._id} className='flex justify-between items-center px-4 py-2 border border-black mt-2'>
                      
                     
                               <div className='gap-2'>
                            
                               <h2 className='text-xl font-bold'>{item.title}</h2>
                               <div className='py-2 text-lg w-[90%] line-clamp-1'>
                                   {item.description}
                       
                               </div>
                              
                           </div>
                          
                           <div className='space-x-3 flex justify-center'>
                             <DeleteBtn  id={item._id}/>
                              <Link href={`/editItem/${item._id}`}>
                               <button type='button' className='px-3 py-2 text-xl font-semibold bg-green-500 rounded-lg' onClick={()=>setLoading(true)}>edit</button> 
                            </Link>
                            <Link href={"/addMore"}> <button className='bg-blue-500  px-4 py-2 text-xl font-semibold rounded-lg'
                            onClick={()=>setLoading(true)}
                            >
                                      Add
                                  </button></Link>
                           </div>
                         
                               </div>
                          ))}</div> 
              } 
        
            </div>
 
  )
}

export default ItemsList