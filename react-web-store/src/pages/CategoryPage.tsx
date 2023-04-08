import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCategory } from "../utils/api";
import CategoryItem from "../components/common/CategoryItem";
import { CategoryItemDetailsType } from "../types";



export default function CategoryPage() {

    const { category_id } = useParams()

    const { data, error } = useQuery<CategoryItemDetailsType[], Error>(["category", category_id], () => getCategory(category_id))

    error && alert(error.message)

    const showDescription = false


    return (
        <div>
            {data?.map((categoryItem) => {
                return (
                    <CategoryItem key={categoryItem.id} {...categoryItem} showDescription={showDescription} categoryId={category_id} />
                )
            })}
        </div>
    )
}