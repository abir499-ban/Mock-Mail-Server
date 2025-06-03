import { fetchMethods } from "@/config/fetchAPI"
import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import { string } from "zod/v4"

declare module 'next-auth'{
    interface User{
        message?: string,
        data?:{
            email:string,
            accessToken:string
        }
    }
    interface Session{
        user:{
            email : string
        },
        accessToken:string
    }
}


export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:'user_login',
            name:'User Login',
            credentials: {
                email: { name: 'email', type: 'text' },
                password: { name: 'password', type: 'password' },
            },
            authorize: async(credentials : Record<string ,string> | undefined, req)=>{
                if(!credentials) return null
                console.log("from credentials" , credentials)
                const {email , password} = credentials
                try {
                    const response = await fetchMethods.post('/auth/signin', JSON.stringify({email , password}))
                    if(response) return response
                    return null
                } catch (error) {
                    console.log(error)
                    return null
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.email = user.data?.email || null
                token.accessToken = user.data?.accessToken || null
            }
            return token
        },
        async session({session , token}){
           session.user={
            email : token.email as string
           }
           session.accessToken = token.accessToken as string
           return session
        }
    },
    session:{
        strategy : 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET 

}

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}