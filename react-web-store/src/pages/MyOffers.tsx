import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabase/client";


export default function MyOffers() {

    const { data: info, isFetching } = useQuery(['user'], () => supabaseClient.auth.getUser())

    const userId = info?.data.user?.id

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["my-offers"],
        queryFn: () => {
            return supabaseClient
                .from('offers')
                .select('*')
                .eq('ownerid', userId)
        }, enabled: !!userId
    })

    const offers = data?.data || []

    const handleDelete = async (id:string) => {

        await supabaseClient
            .from("offers")
            .delete()
            .eq('id', id)
    }


    const navigate = useNavigate()



    if (!userId && !isFetching) {
        navigate('/login')
    }

    if (isFetching) {
        <div>Loading...</div>
    }


    return (
        <div className="p-2 m-2 text-lime-300 flex flex-col text-center">
            {
                offers?.map((item): any => {
                    return (
                        <div key={item.id} className="flex flex-col items-center  p-5 m-5 border border-lime-700 rounded">
                            <div className="bg-green-800 p-1 rounded text-lime-300">
                                <span>{item.title}</span>
                            </div>
                            <div className="p-3">
                                <img src={item.imageurl} className="h-80 object-fill"></img>
                            </div>
                            {<div><p className="bg-green-800 p-1 rounded text-lime-300">{item.description}</p> </div>}
                            <div className="p-1 flex flex-col text-lime-300 space-x-1">
                                <div className="inline-flex justify-center h-8 rounded">
                                    <span className="p-1 bg-green-800 rounded">{item.price}$</span></div>
                                <div className="flex items-center justify-center">
                                    <button className="p-1 mx-1 flex-1  text-cyan-400" onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
                                    <button className="p-1 flex-1 text-cyan-400" onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


{/* <div key={id} className="flex items-center flex-col p-5 m-5 border border-lime-700 rounded">
<div className="bg-green-800 p-1 rounded text-lime-300">
    <span>{title}</span>
</div>
<div className="p-3">
    <img src={image} className="h-80 object-fill"></img>
</div>
{showDescription && <div><p className="bg-green-800 p-1 rounded text-lime-300">{description}</p> </div>}
<div className="p-1 text-lime-300 space-x-1">
    <div className="inline-flex p-1 h-8 bg-green-800 rounded">{price}$</div>
    {!showDescription && <button className="p-1 rounded border border-lime-400  text-cyan-400  cursor-pointer" onClick={() => {
        navigate(`/categories/${categoryId}/${id}`)
    }}>Details</button>}
    <AddToWishlist title={title} price={price} description={description} imgUrl={image} />
    <AddToCart id={id}/>
</div>
</div> */}