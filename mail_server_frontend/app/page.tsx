'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { fetchMethods } from '@/config/fetchAPI'
import LoadingSpinner from '@/components/ui/shared/Loader'
import { fetchedUserType } from '@/utils/user.schema'
import { ComposeMessageModel } from '@/components/ui/shared/MessageCompose'

export default function Home() {
  const router = useRouter()
  const { status, data } = useSession()
  const [user, setuser] = useState<fetchedUserType>({
    _id: '',
    username: '',
    email: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login')
    else if (status === 'authenticated') {
      const fetchUser = async () => {
        try {
          const userData = await fetchMethods.get(`/user/${data?.user.email}`,
            { 'authorization': `Bearer ${data?.accessToken}` })
          //console.table(userData)
          setuser(userData)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
    }
  }, [status, router, data?.accessToken])

  if (status === 'loading') return <LoadingSpinner />

  return (
    <>
      <div className="text-5xl flex mt-16 justify-center items-center font-serif text-red-500  bg-red-50">
        Welcome
      </div>
      
      <section className='fixed bottom-8 right-6 z-50'>
        <ComposeMessageModel email={user.email} username={user.email}/>
      </section>
    </>
  );
}
