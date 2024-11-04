 "use client"
import { useRouter } from 'next/navigation';
import React from 'react'
 


const DeleteBtn = ( {id}:any) => {
  const router=useRouter();
    const handelDelete=async()=>{
        const  confirmed=confirm("do you want to delete the data");
        if(confirmed){
         const itemDeleted= await fetch(`api/topics?id=${id}` ,
            {
                method:"DELETE"
            }
         )
         if(itemDeleted.ok){
            router.refresh()
         }
        }
     }
     
  return (
    <button className='px-2 py-2 text-base font-medium bg-red-500 text-white  rounded-lg '
             onClick={handelDelete}
             >
                 Delete 
             </button>
  )
}

export default DeleteBtn