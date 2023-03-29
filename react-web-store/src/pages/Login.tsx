import React from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabaseClient } from "../supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'


const LoginSchema = z.object({
    email: z.string().email("You must provide a valid email!"),
    password: z.string()
})

type LoginInputs = {
    email: string,
    password: string
}


export default function Login() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({ resolver: zodResolver(LoginSchema), mode: "onSubmit" });

    async function onSubmit(data: LoginInputs) {

        try {
            const { data: loginData, error } = await supabaseClient.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })
            
            error && alert(error.message)
            navigate('/')
        } catch (error) {
            alert(error)
        }
    }

    const errorMessage = errors.email?.message || errors.password?.message


    return (
        <>
            <div className="h-56 p-2 rounded border border-lime-800 flex text-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="mb-3">
                        <div className="p-1 text-lime-400 ">Email</div>
                        <input {...register("email")} type={"email"} className=" bg-lime-800 outline-lime-300"></input>
                    </div>
                    <div className="mb-3">
                        <div className="p-1 text-lime-400 ">Password</div>
                        <input {...register("password")} type={"password"} className=" bg-lime-800 outline-lime-300"></input>
                    </div>
                    <button className="p-1 text-cyan-400">Login</button>
                    <div>
                        <span className="p-1 text-lime-400">Don't have an account?</span>
                        <button type="submit" className="underline text-green-400" onClick={() => navigate("/register")}>Register</button>
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