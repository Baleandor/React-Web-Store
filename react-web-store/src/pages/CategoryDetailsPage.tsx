import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCategoryItem } from "../utils/api";
import CategoryItem from "../components/common/CategoryItem";
import { CategoryItemDetailsType } from "../types";
import { errorTracker } from "../utils/errorTracker";


export default function CategoryItemPage() {

    const { item_id } = useParams()

    const { data, error, isLoading } = useQuery<CategoryItemDetailsType, Error>(["category", item_id], () => getCategoryItem(item_id))

    errorTracker(error)

    if (isLoading) return <div className="text-lime-200 p-1 flex justify-center items-center"><span className="bg-lime-900 p-1 rounded">Loading content...</span></div >

    if (!data) return null


    return (
        <CategoryItem {...data} showDescription />
    )

}