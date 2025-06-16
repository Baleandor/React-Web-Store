import React from "react";
import { useState } from "react";
import CategoriesDropdown from "./CategoriesDropdown";


export default function Categories() {

    const [showCategories, setShowCategories] = useState(false)

    const closeDropdown = () => {
        setShowCategories(false)
    }

    const openDropdown = () => {
        setShowCategories(true)
    }


    const handleToggleDropdown = () => {
        setShowCategories(!showCategories)
    }

    
    return (
        <div>
            <div onClick={handleToggleDropdown} className="cursor-pointer p-0.5">
                <div className="text-cyan-200 hover:text-cyan-100">Categories</div>
            </div>

            {showCategories && <CategoriesDropdown closeDropdown={closeDropdown} />}
        </div>
    )
}
