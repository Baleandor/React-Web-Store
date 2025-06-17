import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryItemDetailsType } from "../../../types";

type SearchBarAutofillDropdownType = {
  autofillResult: CategoryItemDetailsType[] | undefined;
  setIsAutofillOpen: (isAutofillOpen: boolean) => void;
};

export default function SearchBarAutofillDropdown({
  autofillResult,
  setIsAutofillOpen,
}: SearchBarAutofillDropdownType) {
  const navigate = useNavigate();
  const navigateToItem = (id: number) => {
    setIsAutofillOpen(false);
    navigate(`/search/${id}`);
  };

  return (
    <div className="absolute top-7 z-10 rounded bg-lime-500 text-black w-42 p-1">
      {autofillResult?.length ? (
        <ul>
          {autofillResult.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => navigateToItem(item.id)}
                className="hover:underline cursor-pointer"
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="p-0.5">{`No results found :(`}</div>
      )}
    </div>
  );
}
