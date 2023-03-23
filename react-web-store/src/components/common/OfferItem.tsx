import React from "react";
import { OfferItemType } from "../../types";


type OfferItemProps = {
    data: any
}


export default function OfferItem({data}:OfferItemProps) {

    
    return (
        <>
            <div className="h-60 w-64 ">
                <img src={data?.image} className="h-60 w-64 object-fill" />
            </div>

            <div className="p-1 flex flex-col justify-between flex-1">
                <div className="flex justify-between">
                    <span className="max-w-[200px]">{data?.title} </span>
                    <span className="max-w-[200px]">{data?.description} </span>
                    <span >Price: ${data?.price}</span>
                </div>

                <div className="flex items-center justify-center">
                    <button className="p-1 mx-1 flex-1 max-w-[30px] text-cyan-400" onClick={() => { }}>Edit</button>
                    <div className="p-1 text-center flex-1 max-w-[30px] text-cyan-400" onClick={() => { }}>Delete</div>
                </div>
            </div>
        </>
    )
}