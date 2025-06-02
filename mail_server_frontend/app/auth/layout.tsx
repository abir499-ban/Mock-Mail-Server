import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
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