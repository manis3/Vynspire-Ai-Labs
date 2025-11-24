import React, { useState } from "react";

export default function useSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return {
    searchTerm,
    handleSearch,
  };
}
