"use client"
import Link from 'next/link'
import React, {  useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import LoadingPage from '@/app/loadingPage'
const SignUpPage = () => {
 
    const [loading ,setLoading]=useState(false);
     
    const [user , setUser] =useState({
        userName:"",
        email:"",
        password:""
    });
    const route=useRouter()
     
         
   const postUserData=async()=>{
   try {
 
    await axios.post("/api/users/signup",user);
     
    if(user.userName.length> 4 && user.email.length>4 && user.password.length>3  ){
        route.push('/verifyemail')
    }else{
        alert("user name and email must contain atleast 4 chracters")
    }
   } catch (error) {
     console.log(error,"failed to send data");
    alert("Pease add any user")
   }
   }

   const handelUserData=async()=>{
    setLoading(true);
    await postUserData();
    setLoading(false);
       
   }
      
   return ( 
    <section>
    <div className='relative flex flex-col justify-center items-center p-5 max-w-[600px] border border-gray-600 mx-auto py-4'>
            <div className=''>
            <h2 className='p-3 text-2xl font-semibold text-center py-2'>Sign In Page</h2>
            <label htmlFor="#" className='text-lg font-medium p-2'>User Name</label>
            <input type="text" className=' border border-gray-400  w-full p-2   mb-3 rounded-xl shadow-xl' placeholder='please enter your name.'
            value={user.userName}
            onChange={(e:any)=> setUser({...user,userName:e.target.value})}
            /><br></br>
            <label htmlFor="#" className='text-lg font-medium p-2'>Email</label>
            <input required type="text" className=' border border-gray-400  w-full p-2   mb-3 rounded-xl shadow-xl' placeholder='please enter your email here.' 
            value={user.email}
            onChange={(e:any)=> setUser({...user,email:e.target.value})}
            /><br></br>
            <label className='text-lg font-medium p-2' htmlFor="#">Password</label>
            <input type="password"  className=' border border-gray-400  w-full p-2   mb-3 rounded-xl shadow-xl' placeholder='Enter your password here' 
             value={user.password}
             onChange={(e:any)=> setUser({...user,password:e.target.value})}
            />
            <button className='px-6 py-3 rounded-2xl bg-blue-700 text-white text-base font-medium w-full'
            onClick={()=>{handelUserData()}}
            >Sign Up</button>
      
            </div>
           
            or you have already account? <Link href={'/signin'}><button className='px-5 py-3 rounded-2xl border border-white' >Sign In</button></Link>
            {loading ?  <LoadingPage/> : "" }
    </div>
 
   </section>
   )
  
}

export default SignUpPage