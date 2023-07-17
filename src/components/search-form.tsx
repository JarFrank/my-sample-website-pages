import { SearchModel } from "./search-results";
import { FormEvent, useState } from "react";

type SearchFormProps = {
  onSearch: (results: SearchModel) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(`/api/search?q=${query}`);
    const json = await res.json();
    onSearch(json as SearchModel);
  };

  return (
    <div className="py-5">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-input"
          placeholder="Enter search query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 border border-gray-700 text-white bg-gray-800 rounded-md hover:bg-gray-700"
        >
          Search
        </button>
      </form>
    </div>
  );
}
