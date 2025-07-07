import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingBox from "../LoadingBox";

type CategoriesDropdownPropsType = {
  closeDropdown: () => void;
};

export default function CategoriesDropdown({
  closeDropdown,
}: CategoriesDropdownPropsType) {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstRender = useRef(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when route changes (but not on initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    closeDropdown();
  }, [location.pathname, closeDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  const {
    data: categories,
    isError,
    error,
    isLoading,
  } = useQuery<string[], Error>(["categories"], getCategories);

  if (isLoading || isError)
    return (
      <div className="text-lime-200 bg-lime-900 w-24 rounded absolute top-10 left-0 p-1">
        <span>{isLoading ? <LoadingBox /> : `Error: ${error.message}`}</span>
      </div>
    );

  if (!categories) return null;

  return (
    <div ref={dropdownRef} className="cursor-pointer absolute top-full -left-4 bg-lime-800 text-cyan-200 w-24 rounded z-10 p-1 ">
      <ul>
        {categories.map((category) => {
          return (
            <li
              key={category}
              className="p-1 hover:text-lime-100 hover:underline"
              onClick={() => {
                navigate(`/categories/${category}`);
                closeDropdown();
              }}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
