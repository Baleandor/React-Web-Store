import React from "react";
import { useQuery } from '@tanstack/react-query'
import { getCategories } from "../../../utils/api";
import { useNavigate } from "react-router-dom";


type CategoriesDropdownPropsType = {
    handleClick: () => void
}


export default function CategoriesDropdown({ handleClick }: CategoriesDropdownPropsType) {

    const navigate = useNavigate()

    const { data: categories, isError, error, isLoading } = useQuery<string[], Error>(["categories"], getCategories)

    if (isLoading || isError) return <div className="text-lime-200 bg-lime-900 w-24 rounded absolute top-10 left-0 p-1"><span >{isLoading ? "Loading..." : `Error: ${error.message}`}</span></div>
    
    if (!categories) return null


    return (
        <div className="cursor-pointer absolute top-7 bg-lime-900  text-cyan-400 w-24 rounded z-10">
            <ul>
                {categories.map((category) => {
                    return <li key={category} className="p-1 hover:text-lime-100 hover:underline" onClick={() => {
                        navigate(`/categories/${category}`)
                        handleClick()
                    }}>{category}</li>
                })}
            </ul>
        </div>
    )
}