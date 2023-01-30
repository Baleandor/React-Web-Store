import React from "react";

export default function SearchIcon() {

    function onClickSearch() {

    }
    return (
        <div onClick={onClickSearch} className="inline-flex w-10 h-8 bg-lime-600 justify-center">
            <img src="/images/search-icon.jpg" className="w-8 h-8 cursor-pointer"></img>
        </div>
    )
}