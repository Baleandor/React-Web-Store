import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryItemDetailsType } from "../../../types";


type SearchBarAutofillDropdownType = {
    autofillResult: CategoryItemDetailsType[] | undefined
}


export default function SearchBarAutofillDropdown({ autofillResult }: SearchBarAutofillDropdownType) {

    const navigate = useNavigate()


    return (
        <div className="absolute top-9 z-10 rounded bg-lime-500 text-black w-42">
            {autofillResult?.length ? <ul>
                {autofillResult.map((item) => {
                    return <li key={item.id} onClick={() => navigate(`/search/${item.id}`)} className="hover:underline cursor-pointer">{item.title}</li>
                })}
            </ul> : <div className="p-0.5">{`No results found :(`}</div>}
        </div>
    )
}