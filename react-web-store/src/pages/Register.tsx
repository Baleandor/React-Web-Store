import React from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm  } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { supabaseClient } from "../supabase/client";


const RegisterSchema = z.object({
    email: z.string().email("You must provide a valid email!"),
    username: z.string().min(4, "Username must be at least 4 characters long!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    repass: z.string()
}).refine((data) => data.password === data.repass, {
    message: "Passwords must match!",
    path: ["repass"]
})

type RegisterInputs = {
    email: string,
    username: string,
    password: string,
    repass: string
}


export default function Register() {

const navigate = useNavigate()

const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({ resolver: zodResolver(RegisterSchema), mode: "onSubmit" });

async function onSubmit(data:RegisterInputs){
    const response = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data:{
                username: data.username,
                whishlist: [],
                offers: []
            }
        }
    })

    if(response!= null) {
        navigate('/')
    }
}

const errorMessage = errors.email?.message || errors.username?.message || errors.password?.message || errors.repass?.message


    return (
        <>
        <div className="h-80 p-2 rounded border border-lime-800 flex text-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between">
                <div>
                    <div className="p-1 text-lime-400">Email</div>
                    <input {...register("email")} type={"email"} className=" bg-lime-800 outline-lime-300"></input>
                </div>
                <div>
                    <div className="p-1 text-lime-400">Username</div>
                    <input {...register("username")} className=" bg-lime-800 outline-lime-300"></input>
                </div>
                <div>
                    <div className="p-1 text-lime-400">Password</div>
                    <input {...register("password")} type={"password"} className=" bg-lime-800 outline-lime-300"></input>
                </div>
                <div>
                    <div className="p-1 text-lime-400">Confirm Password</div>
                    <input {...register("repass")} type={"password"} className=" bg-lime-800 outline-lime-300"></input>
                </div>
                <button className="p-1 text-green-400">Register</button>
                <div className="p-1">
                    <span className="p-1 text-lime-400">Already have an account?</span>
                    <button type="submit" className="underline text-green-400" onClick={()=> navigate('/login')}>Login</button>
                </div>
            </form>
        </div>

        {!!errorMessage &&
                <div className="w-auto fixed right-10 bottom-0">
                    <div className="p-1 text-lime-200 bg-lime-900 rounded text-2xl">
                        <p>
                            {errorMessage}
                        </p>
                    </div>
                    <div>
                        <img src="/images/KRUMPIN.png" className="mt-5"></img>
                    </div>
                </div>
            }
        </>
    )
}