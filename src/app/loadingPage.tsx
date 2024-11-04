

import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center max-h-screen max-w-[100vw] w-full h-full bg-gray-400 opacity-70 z-20 overflow-hidden absolute top-0'>
         <div className='h-24 w-24 rounded-3xl border-spacing-2      z-50  bg-gray-600  animate-spin'>

         </div>
    </div>
  )
}

export default LoadingPage