import { UserMessageType } from "@/utils/user.schema";
import { Button } from "../ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function MailView({mail}: {mail :UserMessageType}) {
    return (
        <div className='w-2/3 p-6 overflow-y-auto border-l border-gray-300'>
            {mail ? (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">{mail.subject}</h2>
                    <p className="text-xs text-muted-foreground">{mail.short_description}</p>
                    <p className="text-sm text-gray-600">From: {mail.sender.email}</p>
                    <p className="text-sm text-gray-600">To: {mail.dest.email}</p>
                    <hr />
                    <p className="text-base text-gray-800 whitespace-pre-wrap">
                        {mail.body}
                    </p>
                    <section>
                        {mail.attachments && (
                            <Link href={mail.attachments} target="_blank"><Button className="w-[200px]"><ExternalLink/>View File</Button></Link>
                        )}
                    </section>
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-10">
                    Select an email to view its content.
                </p>
            )}
        </div>

    )
}