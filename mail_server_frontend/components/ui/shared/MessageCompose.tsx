'use client'
import { useState } from 'react'
import { PencilIcon, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { MessageSchema, MessageSchemaType } from '@/utils/message.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'


export function ComposeMessageModel({ username, email }: { username: string, email: string }) {
    const [file, setfile] = useState<File | null>(null)
    
    const {
        register,
        formState: { errors, isSubmitting },
        reset,
        handleSubmit
    } = useForm<MessageSchemaType>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            dest: "",
            subject: "",
            short_desc: "",
            body: "",
        }
    })

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button className='hover:cursor-pointer'><PencilIcon />Compose</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[600]">
                <form className='flex flex-col gap-5'>

                    <DialogHeader className='mb-9'>
                        <DialogTitle className='flex justify-center items-center text-xl'>Compose a Mail</DialogTitle>
                    </DialogHeader>


                    <div>
                        <Label htmlFor="dest" className="flex items-center gap-1">
                            To
                        </Label>
                        <Input
                            id="dest"
                            {...register("dest")}
                            placeholder="Enter your Destination Mail"
                            className="mt-1"
                        />
                        {errors.dest && (
                            <p className="text-red-500 text-xs mt-1">{errors.dest.message}</p>
                        )}
                    </div>


                    <div>
                        <Label htmlFor="subject" className="flex items-center gap-1">
                            Subject
                        </Label>
                        <Input
                            id="subject"
                            {...register("subject")}
                            placeholder="Enter your Email Subject here"
                            className="mt-1"
                        />
                        {errors.subject && (
                            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="short_desc" className="flex items-center gap-1">
                            Short Description
                        </Label>
                        <Input
                            id="short_desc"
                            {...register("short_desc")}
                            placeholder="Enter a Short Email Description"
                            className="mt-1"
                        />
                    </div>


                    <div>
                        <Label htmlFor="body" className="flex items-center gap-1">
                            Body
                        </Label>
                        <Textarea
                            id="body"
                            {...register("body")}
                            placeholder="Enter an Email Body"
                            className="mt-1"
                        />
                    </div>

                    <div className='flex justify-center items-center'>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setfile(e.target.files ? e.target.files[0] : null)
                            }}
                        />

                        <label htmlFor="fileInput">
                            <Upload className="inline-block mr-3" />
                            Choose a File
                        </label>
                        {file !== null && (
                            <div className='text-black text-center m-10 rounded-md font-medium text-xl'>{file.name}</div>
                        )}
                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className='cursor-pointer'>Send Mail</Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}
