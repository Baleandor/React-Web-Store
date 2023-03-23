import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllItems } from "../api/utilities";
import CategoryItem from "../components/common/CategoryItem";
import { CategoryItemDetailsType } from "../types";


export default function SearchResult() {

    const { searchParams } = useParams()

    const showDescription = true

    const { data, isError, error, isLoading } = useQuery<CategoryItemDetailsType[], Error>(["all-items"], getAllItems)

    const autofillResult = data?.filter((result) => {
        if (searchParams) {
            return result.title.toLocaleLowerCase().includes(searchParams)
        }
    })

    if (isLoading) return <div className="text-lime-200 p-1 flex justify-center items-center"><span className="bg-lime-900 p-1 rounded">Loading content...</span></div >

    if (!data) return null


    return (
        <>
            {autofillResult?.map((item) => {
                return (
                    <CategoryItem key={item.id} {...item} showDescription={showDescription} />
                )
            })}
            
        </>
    )
}