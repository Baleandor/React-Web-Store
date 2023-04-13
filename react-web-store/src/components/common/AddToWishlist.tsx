import React from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../supabase/client";
import { ROUTE_PATH } from "../../utils/urls";


type AddToWishlistProps = {
    description: string,
    imgUrl: string,
    title: string,
    price: number
}


export default function AddToWishlist({ description, imgUrl, title, price }: AddToWishlistProps) {

    const navigate = useNavigate()

    const handleAddToWishlist = async () => {
        const { data, error } = await supabaseClient.auth.getSession()

        error && alert(error.message)

        if (!data.session?.user) {
            navigate(ROUTE_PATH.LOGIN)
        } else {
            await supabaseClient
                .from('wishlist')
                .insert([
                    { title: title, price: price, description: description, imageurl: imgUrl, ownerid: data?.session?.user.id },
                ])
                alert("Item successfully added to Wishlist!")
        }
    }


    return (
        <button className="p-1 border border-lime-400 text-cyan-400 rounded cursor-pointer" onClick={handleAddToWishlist}>Wishlist</button>
    )
}