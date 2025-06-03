import {z} from 'zod'

export const MessageSchema = z.object({
    dest: z.string({ required_error: "Email is required" }).email({ message: "Not a valid email" }),
    subject: z.string({ required_error: "Subject is required" }).min(5, "Minimum length of subject"),
    short_desc : z.string(),
    body: z.string(),
})

export type MessageSchemaType = z.infer<typeof MessageSchema>