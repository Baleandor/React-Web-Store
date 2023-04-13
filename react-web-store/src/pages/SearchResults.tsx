import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllItems } from "../utils/api";
import CategoryItem from "../components/common/CategoryItem";
import { CategoryItemDetailsType } from "../types";
import { errorTracker } from "../utils/errorTracker";


export default function SearchResult() {

    const { searchParams } = useParams()

    const { data, error, isLoading } = useQuery<CategoryItemDetailsType[], Error>(["all-items"], getAllItems)

    errorTracker(error)

    const autofillResult = data?.filter((result) => {
        if (searchParams) {
            return result.title.toLocaleLowerCase().includes(searchParams)
        }
    })

    if (isLoading) return <div className="text-lime-200 p-1 flex justify-center items-center"><span className="bg-lime-900 p-1 rounded">Loading content...</span></div >

    if (!data) return null


    return (
        <div>
            {autofillResult?.map((item) => {
                return (
                    <CategoryItem key={item.id} {...item} showDescription />
                )
            })}
        </div>
    )
}