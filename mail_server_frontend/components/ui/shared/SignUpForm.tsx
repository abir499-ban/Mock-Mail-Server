'use client'
import React,{useState} from 'react'
import { Eye, EyeOff,Lock, Mail, User} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SignUpFormSchema , SignUpFormType } from '@/utils/user.schema';

  

    


const SignUpForm = () => {
    const [showPassword, setshowPassword] = useState<boolean>(false)

    const {
        register,
        formState: { errors, isSubmitting },
        reset,
        handleSubmit
    } = useForm<SignUpFormType>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            username : "",
            email : "",
            password : ""
        }
    })

    const SubmitFn = async(data : SignUpFormType) =>{
        console.table(data)
    }
  return (
    <>
        <form className="space-y-5" autoComplete="off" onSubmit={handleSubmit(SubmitFn)}>
            <p className='text-black text-2xl font-semibold'>SignUp to get Started🚀</p>
             <div>
                <Label htmlFor="username" className="flex items-center gap-1">
                    <User className="w-4 h-4 text-blue-500" />
                    Username
                </Label>
                <Input
                    id="username"
                    {...register("username")}
                    placeholder="Enter your Username"
                    className="mt-1"
                />
                {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
            </div>


            <div>
                <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-blue-500" />
                    Email
                </Label>
                <Input
                    id="email"
                    {...register("email")}
                    placeholder="Enter your Email"
                    className="mt-1"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
            </div>
            {/* Password */}
            <div>
                <Label htmlFor="password" className="flex items-center gap-1">
                    <Lock className="w-4 h-4 text-blue-500" />
                    Password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="mt-1 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setshowPassword((prev) => !prev)}
                        className="absolute right-2 top-2 text-gray-400 hover:text-orange-700"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>
            <Button
                type="submit"
                className="w-full mt-4 bg-black  text-white hover:cursor-pointer"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
        </form>
    </>
  )
}

export default SignUpForm