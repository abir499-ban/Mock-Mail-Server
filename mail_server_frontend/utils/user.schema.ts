import {z} from 'zod'

export const SignUpFormSchema = z.object({
    username : z.string().min(3 , "Username must be of three characters").max(50 , 'Username cannot exceed 50 characters'),
    email : z.string({required_error: "Email is required"}).email({ message: "Not a valid email" }),
    password : z.string({required_error:"Password is required"}).min(6 , "Password must be of Minimum 6 length"),
})

export const LogInFormSchema = z.object({
    email : z.string({required_error: "Email is required"}).email({ message: "Not a valid email" }),
    password : z.string({required_error:"Password is required"}).min(6 , "Password must be of Minimum 6 length"),
})

export type LoginFomType = z.infer<typeof LogInFormSchema>
export type SignUpFormType = z.infer<typeof SignUpFormSchema>