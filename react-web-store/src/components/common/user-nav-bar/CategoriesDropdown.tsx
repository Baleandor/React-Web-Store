import React from "react";
import { useQuery } from '@tanstack/react-query'
import { getCategories } from "../../../api/utilities";

export default function CategoriesDropdown() {

    const { data: categories, isError, error, isLoading } = useQuery<string[], Error>(["categories"], getCategories)

    if (isLoading) return <span className="text-lime-200">Loading...</span>
    if (isError) return <span>Error: {error.message}</span>
    if (!categories) return null



    return (
        <div className="cursor-pointer absolute top-7 bg-lime-900  text-lime-400 w-24 rounded">
            <ul>
                {categories.map((category) => {
                    return <li key={category} className="m-1 hover:text-lime-100 hover:underline">{category}</li>
                })}
            </ul>
        </div>


    )

}