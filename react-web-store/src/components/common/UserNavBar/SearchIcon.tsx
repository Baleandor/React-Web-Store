import React from "react";
import { useNavigate } from "react-router-dom";


type SearchIconProps = {
    searchParams: string, 
}


export default function SearchIcon({ searchParams }: SearchIconProps) {

const navigate = useNavigate()


    return (
        <div className="inline-flex w-10 h-8 bg-lime-800 justify-center">
            <img src="/images/search-icon.png" className="w-8 h-8 cursor-pointer" onClick={()=>navigate(`/search-result/${searchParams}`)}></img>
        </div>
    )
}