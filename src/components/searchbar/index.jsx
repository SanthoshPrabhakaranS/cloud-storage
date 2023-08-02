import { Search } from "@/icons/icons";
import React from "react";

const SearchBar = ({ _searchFolder}) => {
  return (
    <div className="w-full p-2 bg-white flex gap-3 items-center shadow-sm rounded-md">
      <span className="text-gray-400">{Search}</span>
      <input
      onChange={(e) => _searchFolder(e.target.value)}
        type="text"
        placeholder="Search"
        className="w-full focus:outline-none placeholder:text-gray-400 placeholder:font-medium"
      />
    </div>
  );
};

export default SearchBar;
