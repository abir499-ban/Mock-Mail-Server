'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { fetchMethods } from '@/config/fetchAPI'
import LoadingSpinner from '@/components/shared/Loader'
import { fetchedUserType, UserMessageType } from '@/utils/user.schema'
import { ComposeMessageModel } from '@/components/shared/MessageCompose'
import { Button } from '@/components/ui/button'
import EmailLister from '@/components/shared/MessageList'
import connectToWSS from '@/utils/wssConnector'
import MailView from '@/components/shared/MailView'
import { toast } from 'react-toastify'

export default function Home() {
  const wsRef = useRef<WebSocket | null>(null)
  const router = useRouter()
  const { status, data } = useSession()
  const [user, setuser] = useState<fetchedUserType>({
    _id: '',
    username: '',
    email: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
    sentMessages: [],
    receivedMessage: []
  })
  const [selectedmail, setselectedmail] = useState<UserMessageType | null>(null)


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


          const ws = await connectToWSS(data.user.email)
          wsRef.current = ws
          const eventDataHandler = (evenData: MessageEvent) => {
            const socketData = JSON.parse(evenData.data)
            if (socketData.event == 'incoming call') {
              console.log(socketData.message)
              //alert(`New mail from ${socketData.message.from} about ${socketData.message.topic}`)
              toast(`🔔New mail from ${socketData.message.from} about ${socketData.message.topic}`)
            } else {
              alert(`${socketData.message}`)
            }
          }


          ws.addEventListener('message', eventDataHandler)

          return () => async () => {
            if (wsRef.current) {
              wsRef.current.removeEventListener('message', eventDataHandler)
              wsRef.current.close()
              wsRef.current = null
            }
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchUser()

      return () => {
        if (wsRef.current) {
          wsRef.current.close()
          wsRef.current = null
        }
      };
    }
  }, [status, router, data?.accessToken])

  if (status === 'loading') return <LoadingSpinner />

  return (
    <>
      <div className="text-5xl flex justify-end mt-5 mr-4">
        <Button variant='destructive' onClick={() => signOut()}>Sign Out</Button>
      </div>

      <div className='flex flex-row h-screen'>
        <div className=' w-1/2 shadow-md p-4 overflow-y-auto'>
          <EmailLister sentMails={user.sentMessages} receivedMails={user.receivedMessage} onSelectMail={(mail)=>setselectedmail(mail)}/>
        </div>


        <div className='w-1/2'>
          {selectedmail && <MailView mail={selectedmail} />}
          <section className='fixed bottom-8 right-6 z-50'>
            <ComposeMessageModel email={user.email} username={user.username} />
          </section>
        </div>
      </div>
    </>
  );
}
