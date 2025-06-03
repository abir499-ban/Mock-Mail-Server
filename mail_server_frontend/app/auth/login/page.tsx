import LogInForm from '@/components/ui/shared/LogInForm'
import React from 'react'
import Link  from 'next/link'

const page = () => {
    return (
        <>
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
                    <LogInForm/>
                    <p className='mt-4 text-xm text-muted-foreground'>Dont have an account? 
                    <Link href='/auth/signup' className='text-blue-600'>Create one here</Link></p>
                </div>
            </div>
        </>
    )
}

export default page