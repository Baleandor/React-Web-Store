import React from "react";
import { useNavigate } from "react-router-dom";
import OfferItem from "../components/common/OfferItem";
import { supabaseClient } from "../supabase/client";
import { OfferItemType } from "../types";


const {
    data: { user },
} = await supabaseClient.auth.getUser()


let { data: offers } = await supabaseClient
    .from('wishlist')
    .select('*')
    .eq('ownerid', user?.id)


// type offer = {
//     title: string,
//     price: number,
//     description: string,
//     imageurl: string
// }

export default function MyWishlist() {

    console.log(typeof offers)
    const navigate = useNavigate()

    if (!user) {
        navigate('/login')
    }



    return (
        <div className="p-2 m-2 rounded border border-lime-800 text-lime-300 flex text-center">
            {
                offers?.map((item): any => {
                    <>
                        {console.log(item)}

                        <div className="h-60 w-64 ">
                            <img src={item?.image} className="h-60 w-64 object-fill" />
                        </div>

                        <div className="p-1 flex flex-col justify-between flex-1">
                            <div className="flex justify-between">
                                <span className="max-w-[200px]">{item?.title} </span>
                                <span className="max-w-[200px]">{item?.description} </span>
                                <span >Price: ${item?.price}</span>
                            </div>

                            <div className="flex items-center justify-center">
                                <button className="p-1 flex-1 max-w-[30px] text-cyan-400" onClick={() => { }}>Delete</button>
                            </div>
                        </div>
                    </>
                })
            }

        </div>
    )
}