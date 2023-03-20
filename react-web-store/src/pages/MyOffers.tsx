import React from "react";
import OfferItem from "../components/common/OfferItem";
import { supabaseClient } from "../supabase/client";
import { OfferItemType } from "../types";


const {
    data: { user },
} = await supabaseClient.auth.getUser()
let metadata = user?.user_metadata


export default function MyOffers() {

    return (
        <div className="p-2 m-2 rounded border border-lime-800 text-lime-300 flex text-center">
            {/* {
                metadata?.offers.map((item: OfferItemType) => {
                    < OfferItem metadata={item} />
                })

            } */}
            <div className="h-60 w-64 ">
                <img src={metadata?.image} className="h-60 w-64 object-fill" />
            </div>

            <div className="p-1 flex flex-col justify-between flex-1">
                <div className="flex justify-between">
                    <span className="max-w-[200px]">{metadata?.title} </span>
                    <span className="max-w-[200px]">{metadata?.description} </span>
                    <span >Price: ${metadata?.price}</span>
                </div>

                <div className="flex items-center justify-center">
                    <button className="p-1 mx-1 flex-1 max-w-[30px]" onClick={() => { }}>Edit</button>
                    <button className="p-1 flex-1 max-w-[30px]" onClick={() => { }}>Delete</button>
                </div>
            </div>
        </div>
    )
}