import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabase/client";
import OfferItem from "../components/common/OfferItem";
import LoadingBox from "../components/common/LoadingBox";
import { ROUTE_PATH } from "../utils/urls";


export default function MyOffers() {

    const { data: info, isFetching } = useQuery(['user'], () => supabaseClient.auth.getUser())

    const userId = info?.data.user?.id

    const { data, error } = useQuery({
        queryKey: ["my-offers"],
        queryFn: () => {
            return supabaseClient
                .from('offers')
                .select('*')
                .eq('ownerid', userId)
        }, enabled: !!userId
    })

    error && alert(error)

    const offers = data?.data || []

    const handleDelete = async (id: string) => {
        const { error } = await supabaseClient
            .from("offers")
            .delete()
            .eq('id', id)

        error && alert(error.message)
        alert("Item successfully deleted!")
    }

    const navigate = useNavigate()

    if (!userId && !isFetching) {
        navigate(ROUTE_PATH.LOGIN)
    }


    return (
        <div className="p-2 m-2 text-lime-300 flex flex-col text-center">
            {isFetching && <LoadingBox />}
            {
                offers?.map((item): any => {
                    return (
                        <OfferItem key={item.id} item={item} handleDelete={handleDelete} />
                    )
                })
            }
        </div>
    )
}