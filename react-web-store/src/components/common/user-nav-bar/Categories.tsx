import React from "react";
import { useState } from "react";
import CategoriesDropdown from "./CategoriesDropdown";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function Categories() {

    const client = new QueryClient()
    const [showCategories, setShowCategories] = useState(false)


    return (
        <QueryClientProvider client={client}>
            <div onClick={() => setShowCategories(!showCategories)
            } className="cursor-pointer p-0.5">
                <div className="text-lime-400">Categories</div>
            </div>

            {showCategories && <CategoriesDropdown />}
        </QueryClientProvider>
    )
}
