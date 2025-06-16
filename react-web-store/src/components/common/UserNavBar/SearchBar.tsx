import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllItems } from "../../../utils/api";
import { CategoryItemDetailsType } from "../../../types";
import Categories from "./Categories";
import SearchBarAutofillDropdown from "./SearchBarAutofillDropdown";
import SearchIcon from "./SearchIcon";
import { debounce } from "lodash";
import { useForm, SubmitHandler } from "react-hook-form";
import { errorTracker } from "../../../utils/errorTracker";

interface ISearchInputs {
  searchParams: string;
}

export default function SearchBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchInputs>();

  const { data, error } = useQuery<CategoryItemDetailsType[], Error>(
    ["all-items"],
    getAllItems
  );

  errorTracker(error);

  const [searchParams, setSearchParams] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value.toLocaleLowerCase());
  };

  const debouncedOnChange = debounce(handleOnChange, 250);

  const autofillResult = data?.filter((result) => {
    return result.title.toLocaleLowerCase().includes(searchParams);
  });

  const onSubmit = () => {};

  return (
    <div className={`w-80 h-8 flex relative items-center justify-center top-5 rounded-md overflow-hidden box-border ${isFocused ? 'border-2 border-lime-300' : 'border-2 border-transparent'}`}>
      <div className="flex bg-lime-800 w-28 h-full justify-center items-center text-center">
        <Categories />
      </div>
      <div className="flex h-full flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex-1">
          <input
            {...register("searchParams")}
            className="bg-lime-500 w-full h-full outline-none pl-1"
            onChange={debouncedOnChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></input>
        </form>
       <SearchIcon searchParams={searchParams}/>
        {searchParams.length > 0 && (
          <SearchBarAutofillDropdown autofillResult={autofillResult} />
        )}
      </div>
    </div>
  );
}
