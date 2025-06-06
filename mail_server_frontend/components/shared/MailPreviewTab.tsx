'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paperclip } from "lucide-react"
import { UserMessageType } from "@/utils/user.schema"
import {Badge} from '@/components/ui/badge'
 

interface EmailItemProps{
    email : UserMessageType,
    type : string
}


export default function EmailItem({ email, type }: EmailItemProps) {
  let displayName = "" ,displayEmail = "";
  if(type == "sent"){
    displayEmail = email.dest.email
  }else{
    displayName = email.sender.username;
    displayEmail = email.sender.email
  }

  return (
    <Card
      className={`mb-3 transition-all hover:shadow-md cursor-pointer ${!email.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src='https://w7.pngwing.com/pngs/1004/160/png-transparent-computer-icons-user-profile-social-web-others-blue-social-media-desktop-wallpaper.png'/>
            </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{displayName}</h4>
                {email.isRead && (
                  <Badge variant="secondary" className="text-xs px-2 py-0">
                    New
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                {email.attachments != null && <Paperclip className="h-3 w-3" />}
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-1">{displayEmail}</p>

            <h5 className="text-sm font-medium text-gray-800 mb-1 truncate">{email.subject}</h5>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
