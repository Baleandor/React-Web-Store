import React from "react";
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

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ resolver: zodResolver(loginSchema), mode: "onSubmit" });

    async function onSubmit(data: LoginData) {

        try {
            const { data: loginData, error } = await supabaseClient.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

            error && alert(error.message)
            navigate(ROUTE_PATH.HOME)
        } catch (error) {
            alert(error)
        }
    }

    const errorMessage = errors.email?.message || errors.password?.message


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

            {!!errorMessage &&
                <ShrekErrorBox errorMessage={errorMessage} />
            }
        </div>
    )
}