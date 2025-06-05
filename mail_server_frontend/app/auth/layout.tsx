import React from 'react'
import { getServerSession } from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {redirect} from 'next/navigation'


const layout = async({children} : {children : React.ReactNode}) => {
  const session = await getServerSession(authOptions)
  if(session)
    redirect('/')
  return (
    <>
    <div className='flex flex-row gap-0'>
        <div className='bg-[#1f1d1d] w-1/2 h-screen'></div>
        <div className='w-1/2'>{children}</div>
    </div>
    </>
  )
}

export default layout