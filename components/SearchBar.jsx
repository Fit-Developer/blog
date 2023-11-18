import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/router";

const SearchBar = ({ onSearch }) => {
  const router = useRouter();

  const [term, setTerm] = useState("");
  const handleSearch = () => {
    // if (Object.keys(router.query).length === 0) {
    //   router.push(`?term=${term}`);
    // } else {
    //   router.push(`${router.asPath}&term=${term}`);
    // }
  };
  return (
    <div className="relative">
      <input
        type="search"
        className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg  "
        placeholder="Search"
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />
      <button
        onClick={handleSearch}
        className="text-white absolute top-[50%] right-1 translate-y-[-50%] bg-sky-500 font-medium rounded-lg text-sm py-1 px-1"
      >
        <CiSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
