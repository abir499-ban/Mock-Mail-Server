import SignUpForm from '@/components/shared/SignUpForm'
import React from 'react'
import Link from 'next/link'

const page = () => {
    return (
        <>
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
                    <SignUpForm />
                    <p className='mt-4 text-xm text-muted-foreground'>Already have one?
                        <Link href='/auth/login' className='text-blue-600'>Login here</Link></p>
                </div>
            </div>
        </>
    )
}

export default page