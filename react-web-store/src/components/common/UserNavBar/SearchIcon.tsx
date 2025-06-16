import React from "react";
import { useNavigate } from "react-router-dom";

type SearchIconProps = {
  searchParams: string;
};

export default function SearchIcon({ searchParams }: SearchIconProps) {
  const navigate = useNavigate();

  return (
    <div className="flex bg-lime-800 w-10 h-full justify-center items-center">
      <img
        src="/images/search-icon.png"
        className="w-6 h-6 cursor-pointer"
        onClick={() => navigate(`/search-result/${searchParams}`)}
      />
    </div>
  );
}
