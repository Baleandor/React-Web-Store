import React from "react";
import { CategoryItemDetailsType } from "../../../types";


type SearchIconProps = {
    searchParams: string,
    data: CategoryItemDetailsType[] | undefined
}

export default function SearchIcon({ searchParams, data }: SearchIconProps) {




    function onClickSearch() {
        const searchQuery = data?.filter((item) => {
            return item.title.toLocaleLowerCase().includes(searchParams)
        })
    }


    return (
        <div className="inline-flex w-10 h-8 bg-lime-600 justify-center">
            <img src="/images/search-icon.jpg" className="w-8 h-8 cursor-pointer" onClick={onClickSearch}></img>
        </div>
    )
}