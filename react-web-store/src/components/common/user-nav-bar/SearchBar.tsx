import React from "react";
import Categories from "./Categories";
import SearchIcon from "./SearchIcon";

export default function SearchBar() {
    const url = 'someurl'
    const fakestore = ''
    return (
        <div className="w-80 h-10 flex relative items-center justify-center top-5">
            <div className="inline-flex bg-lime-800 w-28 h-8 justify-center align-middle text-center">
                <Categories />
            </div>
            <input className="inline-flex bg-lime-500 w-42 h-8 outline-lime-300"></input>
            <SearchIcon />
        </div>
    )
}