import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  const router = useRouter();

  const [term, setTerm] = useState("");
  const handleSearch = () => {
    if (term) {
      router.push({ query: { term: term } });
    } else if (router.query.term === undefined) {
      toast.error("Search is empty!!!");
    } else {
      router.push({ query: {} });
    }
  };
  return (
    <div className="relative">
      <input
        type="search"
        className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none "
        placeholder="Search"
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        value={term}
      />
      <button
        onClick={handleSearch}
        className="text-white absolute top-[50%] right-1 translate-y-[-50%] bg-sky-500 font-medium rounded-lg text-sm py-1 px-1"
      >
        <MagnifyingGlassIcon className="w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
