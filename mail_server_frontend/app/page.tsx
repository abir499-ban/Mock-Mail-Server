'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { fetchMethods } from '@/config/fetchAPI'
import LoadingSpinner from '@/components/shared/Loader'
import { fetchedUserType } from '@/utils/user.schema'
import { ComposeMessageModel } from '@/components/shared/MessageCompose'
import { Button } from '@/components/ui/button'
import EmailLister from '@/components/shared/MessageList'

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
    sentMessages : [],
    receivedMessage : []
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
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
      <div className="text-5xl flex justify-end mt-5 mr-4">
        <Button variant='destructive' onClick={() => signOut()}>Sign Out</Button>
      </div>

      <div className='flex flex-row h-screen'>
        <div className=' shadow-md p-4 overflow-y-auto'>
          <EmailLister sentMails={user.sentMessages} receivedMails={user.receivedMessage}/>
        </div>


        <div>
          <section className='fixed bottom-8 right-6 z-50'>
            <ComposeMessageModel email={user.email} username={user.username} />
          </section>
        </div>
      </div>
    </>
  );
}
