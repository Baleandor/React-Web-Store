import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllItems } from "../../../api/utilities";
import { CategoryItemDetailsType } from "../../../types";
import Categories from "./Categories";
import SearchBarAutofillDropdown from "./SearchBarAutofillDropdown";
import SearchIcon from "./SearchIcon";
import { debounce } from "lodash";


export default function SearchBar() {

    const { data, isError, error } = useQuery<CategoryItemDetailsType[], Error>(["all-items"], getAllItems)

    error && alert(error.message)

    const [searchParams, setSearchParams] = useState('')

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(event.target.value.toLocaleLowerCase())
    }

    const debouncedOnChange = debounce(handleOnChange, 250)

    const autofillResult = data?.filter((result) => {
        return result.title.toLocaleLowerCase().includes(searchParams)
    })


    return (
        <div className="w-80 h-10 flex relative items-center justify-center top-5">
            <div className="inline-flex bg-lime-800 w-28 h-8 justify-center align-middle text-center">
                <Categories />
            </div>
            <div className="inline-flex">
                <input className=" bg-lime-500 w-42 h-8 outline-lime-300" onChange={debouncedOnChange}></input>
                <SearchIcon searchParams={searchParams} />
                {searchParams.length > 0 && <SearchBarAutofillDropdown data={autofillResult} />}
            </div>
        </div>
    )
}