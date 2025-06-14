'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
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
import { fetchMethods } from '@/config/fetchAPI'
import { toast } from 'react-toastify'


export function ComposeMessageModel({ username, email }: { username: string, email: string }) {
    const [file, setfile] = useState<File | null>(null)
    const [fileUrl, setfileUrl] = useState<string | null>(null)
    const { data } = useSession()
    const [fileUploadControls, setfileUploadControls] = useState({
        fileUploading: false,
        fileUploaded: false
    })

    const handleFileUpload = async () => {
        setfileUploadControls(prev => ({ ...prev, fileUploading: true }))
        if (!file) {
            console.log("file not uploaded")
            return;
        }
        try {
            const filename = file.name
            const response = await fetchMethods.post('/cloudinary/get_signedUrl', JSON.stringify({ email, filename }), { 'authorization': `Bearer ${data?.accessToken}` })

            const { apiKey, cloudName, folder, public_id, signature, timestamp } = response.data

            const formData = new FormData()
            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);
            formData.append("folder", folder);
            formData.append("public_id", public_id);

            const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                method: 'POST',
                body: formData
            })
            const res = await cloudinaryRes.json()
            console.log("Uploaded to Cloudinary:", res);
            setfileUrl(res.secure_url)
            setfileUploadControls((prev) => ({ ...prev, fileUploaded: true }))
            toast.success("✅file Uploaded successfully")
        } catch (error) {
            toast.error('❌Error in Uploading file')
            console.log(error)
        } finally {
            setfileUploadControls(prev => ({ ...prev, fileUploading: false }))
        }
    }

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

    const sendMail = async (formdata: MessageSchemaType) => {
        try {
            const sendMailData = {
                dest_mail: formdata.dest,
                subject: formdata.subject,
                short_desc: formdata.short_desc,
                body: formdata.body,
                sender_email: email,
                sender_username: username,
                fileUrl: fileUrl
            }
            const response = await fetchMethods.post('/user/sendMail', JSON.stringify(sendMailData), {
                'authorization': `Bearer ${data?.accessToken}`
            })
            if (response) {
                console.log(response)
                toast.success("mail queued sucessfully")
            }
            else { console.log("Error"); toast.error('mail could not be sent') }
        } catch (error) {
            console.log(error)
            toast.error('mail could not be sent')
        }
    }

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button className='hover:cursor-pointer'><PencilIcon />Compose</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[600]">
                <form className='flex flex-col gap-5' onSubmit={handleSubmit(sendMail)}>

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
                        <Button type='button' disabled={file === null || fileUploadControls.fileUploaded || fileUploadControls.fileUploading} onClick={() => { handleFileUpload() }}>Upload File</Button>
                        <Button type="submit" className='cursor-pointer'>{
                            isSubmitting ? 'Sending Mail...' : 'Send Mail'}</Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}
