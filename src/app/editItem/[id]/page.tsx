   
 
  import EditForm from '@/app/components/editForm'
import React from 'react'
  
  const fetchDataById= async(id:string)=>{
         
    console.log("response value at edit item")
   try {
    const response= await fetch(`${process.env.DOMAIN}/api/topics/${id}`,{cache:"no-store"});
    if(!response.ok){
      console.log("failed to fetch data")
    }else{
      return response.json();
    }
   } catch (error) {
     console.log(error)
   }
  }

  const EditTopic =async ({params}:any) => {


    const {id} =params;

     // const data = await fetchDataById(id);
     const data=  await fetchDataById(id);

  // Handle case where data or topic is missing
  if (!data || !data.topic) {
    console.error('Topic not found or data is undefined');
    return <p>Topic not found.</p>; // Return an error message or component
  }
    const {topic}=data;



    const {title ,description} =topic;
    console.log(id ,"id is trying to fetch over here")
    return (
      <div>
        <EditForm id={id} title={title} description={description}/>
      </div>
    )
  }
  
  export default EditTopic