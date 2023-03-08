import React from "react";
import { useState } from "react";
import CategoriesDropdown from "./CategoriesDropdown";


export default function Categories() {

    const [showCategories, setShowCategories] = useState(false)

    const handleToggleDropdown = () => {
        setShowCategories(!showCategories)
    }
    return (
        <>
            <div onClick={handleToggleDropdown} className="cursor-pointer p-0.5">
                <div className="text-lime-400">Categories</div>
            </div>

            {showCategories && <CategoriesDropdown handleClick={handleToggleDropdown} />}
        </>


    )
}
