import React from "react";
import { OfferItemType } from "../../types";


type OfferItemProps = {
    metadata: OfferItemType
}


export default function OfferItem({metadata}: OfferItemProps) {

    return (
        <>
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
                    <div className="p-1 text-center flex-1 max-w-[30px]" onClick={() => { }}>Delete</div>
                </div>
            </div>
        </>
    )
}