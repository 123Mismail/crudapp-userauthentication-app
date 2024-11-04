  

  import EditForm from '@/app/components/editForm'
import React from 'react'
  
  const fetchDataById= async(id:string)=>{
        
    const response= await fetch(`http://localhost:3000/api/topics/${id}`,{cache:"no-store"});
    if(!response.ok){
      console.log("failed to fetch data")
    }else{
      return response.json();
    }
  }

  const EditTopic =async ({params}:any) => {
    const {id} =params;
    const {topic}=  await fetchDataById(id);
    const {title ,description} =topic;
    console.log(id ,"id is trying to fetch over here")
    return (
      <div>
        <EditForm id={id} title={title} description={description}/>
      </div>
    )
  }
  
  export default EditTopic