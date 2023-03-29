import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabaseClient } from "../supabase/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from "@tanstack/react-query";


const FormSchema = z.object({
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


export default function EditMyOffers() {

    const params = useParams()

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInputs>({ resolver: zodResolver(FormSchema), mode: "onSubmit" });

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            const { error } = await supabaseClient
                .from('offers')
                .update([
                    { title: data.productName, price: data.productPrice, description: data.productDescription, imageurl: data.productImageUrl, },
                ])
                .eq('id', params.itemid)

            error && alert(error.message)

            navigate('/my-offers')
            alert("Item successfully edited!")
        } catch (error) {
            alert(error)
        }
    }

    const errorMessage = errors.productName?.message || errors.productPrice?.message || errors.productDescription?.message || errors.productImageUrl?.message

    const { error } = useQuery({
        queryKey: ["edit-offer"],
        queryFn: () => {
            return supabaseClient
                .from('offers')
                .select('*')
                .eq('id', params.itemid)
        }, enabled: !!params.itemid, onSuccess(response) {
            const item = response.data[0]
            setValue("productName", item?.title)
            setValue("productPrice", item?.price)
            setValue("productDescription", item?.description)
            setValue("productImageUrl", item?.imageurl)

        },
    })

    error && alert(error)


    return (

        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="m-4">
                    <div className="mr-2 text-lime-400">Product Name</div>
                    <input {...register("productName")} className="mt-1 rounded bg-lime-800 outline-lime-300" />
                </div>
                <div className="m-4">
                    <div className="mr-2 text-lime-400">Product Price</div>
                    <input type="number" {...register("productPrice", { valueAsNumber: true })} className="mt-1 rounded bg-lime-800 outline-lime-300" ></input>
                </div>
                <div className="m-4">
                    <div className="mr-2 align-top text-lime-400">Product Description</div>

                    <textarea {...register("productDescription")} className="h-60 w-60 mt-1 rounded bg-lime-800 outline-lime-300 text-lime-50" ></textarea>
                </div>
                <div className="m-4">
                    <div className="mr-2 text-lime-400">Product Image URL</div>

                    <input {...register("productImageUrl")} className="mt-1 rounded bg-lime-800 outline-lime-300" ></input>
                </div>
                <button type="submit" className="text-cyan-400 w-20 h-7 text-center border border-lime-400 rounded">Submit</button>
            </form>

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