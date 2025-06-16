import React from "react";
import { useNavigate } from "react-router-dom";


type OfferItemProps = {
    item: any,
    handleDelete: (id: string) => void
}


export default function OfferItem({ item, handleDelete }: OfferItemProps) {

    const navigate = useNavigate()

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
                    <button className="p-1 mx-1 flex-1  text-cyan-200 hover:text-cyan-100" onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
                    <button className="p-1 flex-1 text-cyan-200 hover:text-cyan-100" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}