import { SearchIcon } from "@/assets/svgs";
import { Input } from "../input";

export function SearchBar({
  searchTerm,
  handleSearch,
}: {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative w-[400px] h-12">
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full h-full pl-10"
      />
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
