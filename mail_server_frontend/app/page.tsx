'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useSession} from 'next-auth/react'

export default function Home() {
  const {status , data} = useSession()
  return (
    <>
    {status === 'authenticated' && data && (
      <p>{data.user?.email} {data.accessToken}</p>
    )}
      <div className="text-5xl flex mt-16 justify-center items-center font-serif text-red-500  bg-red-50">
          Welcome
      </div>
    </>
  );
}
