"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail, Send, Star, Eye } from "lucide-react"
import { UserMessageType } from "@/utils/user.schema"
import EmailItem from "./MailPreviewTab"


export default function EmailLister({sentMails , receivedMails, onSelectMail} : {sentMails : UserMessageType[] , 
  receivedMails : UserMessageType[], 
  onSelectMail : (mail : UserMessageType) => void
}) {



  const [activeTab, setActiveTab] = useState("received")
  const TotalMails : UserMessageType[] = receivedMails.concat(sentMails)

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "received":
        return <Mail className="h-4 w-4" />
      case "sent":
        return <Send className="h-4 w-4" />
      case "favorite":
        return <Star className="h-4 w-4" />
      case "read":
        return <Eye className="h-4 w-4" />
      default:
        return null
    }
  }

 
  return (
    <div className="w-full max-w-4xl  p-6">

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="received" className="flex items-center space-x-2">
            {getTabIcon("received")}
            <span>Received</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {receivedMails.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center space-x-2">
            {getTabIcon("sent")}
            <span>Sent</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {sentMails.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="favorite" className="flex items-center space-x-2">
            {getTabIcon("favorite")}
            <span>Favorite</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {TotalMails.filter((mail)=>mail.isfavourite).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center space-x-2">
            {getTabIcon("read")}
            <span>Read</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {TotalMails.filter((mail)=>mail.isRead).length}
            </Badge>
          </TabsTrigger>
        </TabsList>






        <TabsContent value="received" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Received Emails</h2>
            <Badge variant="outline">{receivedMails.length} emails</Badge>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            {receivedMails.map((email) => (
              <EmailItem key={email._id} email={email} type="received" onMailClick={(mail)=>onSelectMail(mail)}/>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Sent Emails</h2>
            <Badge variant="outline">{sentMails.length} emails</Badge>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            {sentMails.map((email) => (
              <EmailItem key={email._id} email={email} type="sent" onMailClick={(mail)=>onSelectMail(mail)}/>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="favorite" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Favorite Emails</h2>
            <Badge variant="outline">{(TotalMails.filter((mail)=>{return mail.isfavourite})).length} emails</Badge>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            {TotalMails.filter((email) => email.isfavourite).map((email) => (
              <EmailItem key={email._id} email={email} type="favorite" onMailClick={(mail)=>onSelectMail(mail)}/>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Read Emails</h2>
            <Badge variant="outline">{(TotalMails.filter((email)=>{return email.isRead})).length} emails</Badge>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            {TotalMails.filter((email)=>email.isRead).map((email)=>(
                <EmailItem key={email._id} email={email} type="read" onMailClick={(mail)=>onSelectMail(mail)}/>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
