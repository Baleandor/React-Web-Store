import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabaseClient } from "../supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import ShrekErrorBox from "../components/common/ShrekErrorBox";
import { ROUTE_PATH } from "../utils/urls";


const loginSchema = z.object({
    email: z.string().email("You must provide a valid email!"),
    password: z.string()
})

type LoginData = {
    email: string,
    password: string
}


export default function Login() {

    const navigate = useNavigate()
    const [message, setMessage] = useState<string | undefined>(undefined)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ resolver: zodResolver(loginSchema), mode: "onSubmit" });

    const formErrorMessage = errors.email?.message || errors.password?.message

    useEffect(() => {
        setMessage(formErrorMessage)
    }, [formErrorMessage])

    async function onSubmit(data: LoginData) {

        try {
            const { data: loginData, error } = await supabaseClient.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

            if (error) {
                setMessage(error.message)
                return
            }
            navigate(ROUTE_PATH.HOME)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "An unexpected error occurred")
        }
    }


    return (
        <div>
            <div className="h-56 p-2 rounded border border-lime-800 flex text-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="mb-3">
                        <div className="p-1 text-lime-100 ">Email</div>
                        <input {...register("email")} type={"email"} className=" bg-lime-800 outline-lime-300"></input>
                    </div>
                    <div className="mb-3">
                        <div className="p-1 text-lime-100 ">Password</div>
                        <input {...register("password")} type={"password"} className=" bg-lime-800 outline-lime-300"></input>
                    </div>
                    <button className="p-1 text-cyan-200 hover:text-cyan-100">Login</button>
                    <div>
                        <span className="p-1 text-lime-100">Don't have an account?</span>
                        <button type="submit" className="underline text-green-200 hover:text-green-100" onClick={() => navigate(ROUTE_PATH.REGISTER)}>Register</button>
                    </div>
                </form>
            </div>

            <ShrekErrorBox errorMessage={message} />
        </div>
    )
}