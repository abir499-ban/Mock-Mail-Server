import { z } from 'zod'

export const SignUpFormSchema = z.object({
    username: z.string().min(3, "Username must be of three characters").max(50, 'Username cannot exceed 50 characters'),
    email: z.string({ required_error: "Email is required" }).email({ message: "Not a valid email" }),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be of Minimum 6 length"),
})

export const LogInFormSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Not a valid email" }),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be of Minimum 6 length"),
})

export type LoginFomType = z.infer<typeof LogInFormSchema>
export type SignUpFormType = z.infer<typeof SignUpFormSchema>


export type UserMessageType = {
    _id: string;
    sender: {
        username: string;
        email: string;
    };
    dest: {
        email: string;
    };
    status: 'sent' | 'pending' | 'failed'; 
    subject: string;
    short_description: string;
    body: string;
    attachments: string; 
    isfavourite: boolean;
    isRead: boolean;
    __v: number;

}

export type fetchedUserType = {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    sentMessages : UserMessageType[] | [];
    receivedMessage : UserMessageType[] | []
}

