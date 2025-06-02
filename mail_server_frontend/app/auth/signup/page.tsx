import SignUpForm from '@/components/ui/shared/SignUpForm'
import React from 'react'

const page = () => {
    return (
        <>
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
                    <SignUpForm/>
                    
                </div>
            </div>
        </>
    )
}

export default page