import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


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


export default function SellItemsPage() {


    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ resolver: zodResolver(FormSchema), mode: "onSubmit" });

    //TODO change onSubmit to be an actual POST
    const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

    const errorMessage = errors.productName?.message || errors.productPrice?.message || errors.productDescription?.message || errors.productImageUrl?.message




    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="m-4">
                    <div className="mr-2 text-lime-400">Product Name</div>
                    <input {...register("productName")} className="mt-1 rounded bg-lime-800 outline-lime-300" />
                </div>
                <div className="m-4">
                    <div className="mr-2 text-lime-400">Product Price</div>
                    <input type="number" {...register("productPrice", { valueAsNumber: true })} className="mt-1 rounded bg-lime-800 outline-lime-300"></input>
                </div>
                <div className="m-4">
                    <div className="mr-2 align-top text-lime-400">Product Description</div>

                    <textarea {...register("productDescription")} className="h-60 w-60 mt-1 rounded bg-lime-800 outline-lime-300 text-lime-50"></textarea>
                </div>
                <div className="m-4">
                    <div className="mr-2 text-lime-400">Product Image URL</div>

                    <input {...register("productImageUrl")} className="mt-1 rounded bg-lime-800 outline-lime-300"></input>
                </div>
                <input type="submit" className="text-lime-400 w-20 h-7 text-center border border-lime-400 rounded" />
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