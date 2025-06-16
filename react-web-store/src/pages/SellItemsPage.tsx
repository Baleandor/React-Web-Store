import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { supabaseClient } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import ShrekErrorBox from "../components/common/ShrekErrorBox";
import { ROUTE_PATH } from "../utils/urls";


const formSchema = z.object({
    productName: z.string().min(4, "Product name must be at least 4 characters long!"),
    productPrice: z.number().min(1, "Product price must be at least $1 !").int(),
    productDescription: z.string().min(10, "Product description must be at least 10 characters long!").max(25, "Product description cannot be more than 25 characters long!"),
    productImageUrl: z.string().url("Your link must start with http:// or https:// !")
})

interface IFormInputs {
    productName: string,
    productPrice: number,
    productDescription: string,
    productImageUrl: string
}


export default function SellItemsPage() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ resolver: zodResolver(formSchema), mode: "onSubmit" });

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {

            const { data: { user } } = await supabaseClient.auth.getUser()

            const { data: info, error } = await supabaseClient
                .from('offers')
                .insert([
                    { title: data.productName, price: data.productPrice, description: data.productDescription, imageurl: data.productImageUrl, ownerid: user?.id },
                ])

            error && alert(error)
            navigate(ROUTE_PATH.MY_OFFERS)
            alert("Item successfully placed for sale!")
        } catch (error) {
            alert(error)
        }
    }

    const errorMessage = errors.productName?.message || errors.productPrice?.message || errors.productDescription?.message || errors.productImageUrl?.message


    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="mr-2 text-lime-100">Product Name</div>
                <input {...register("productName")} className="mt-1 rounded bg-lime-800 outline-lime-300" />

                <div className="mr-2 text-lime-100">Product Price</div>
                <input type="number" {...register("productPrice", { valueAsNumber: true })} className="mt-1 rounded bg-lime-800 outline-lime-300"></input>

                <div className="mr-2 align-top text-lime-100">Product Description</div>

                <textarea {...register("productDescription")} className="h-60 w-60 mt-1 rounded bg-lime-800 outline-lime-300 text-lime-50"></textarea>

                <div className="mr-2 text-lime-100">Product Image URL</div>

                <input {...register("productImageUrl")} className="mt-1 rounded bg-lime-800 outline-lime-300"></input>

                <button type="submit" className="text-cyan-200 hover:text-cyan-100 w-20 h-7 text-center border border-lime-400 rounded">Submit</button>
            </form>

            {!!errorMessage &&
                <ShrekErrorBox errorMessage={errorMessage} />
            }
        </div>
    )
}