import React from "react";

export default function SellItemsPage() {

    return (

        <form >
            <div className="m-4">
                <div className="mr-2 text-lime-400">Product Name</div>
                <input className="mt-1 rounded bg-lime-800 outline-lime-300"></input>
            </div>
            <div className="m-4">
                <div className="mr-2 text-lime-400">Product Price</div>

                <input className="mt-1 rounded bg-lime-800 outline-lime-300"></input>
            </div>
            <div className="m-4">
                <div className="mr-2 align-top text-lime-400">Product Description</div>

                <input className="h-60 w-60 mt-1 rounded bg-lime-800 outline-lime-300"></input>
            </div>
            <div className="m-4">
                <div className="mr-2 text-lime-400">Product Image URL</div>

                <input className="mt-1 rounded bg-lime-800 outline-lime-300"></input>
            </div>
            <button className="text-lime-400 w-20 h-7 text-center border border-lime-400 rounded">Submit</button>
        </form>
    )

}