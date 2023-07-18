"use client";

import SearchForm from "@/components/search-form";
import Link from "next/link";
import { useState } from "react";
import Shimmer from "./images/shimmer";

export type SearchModel = {
  query: string;
  results: SearchResult[];
};

export type SearchResult = {
  score: number;
  id: string;
  name: string;
  url: string;
  image: string;
  highlights: string[];
};

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState<
    SearchResult[] | undefined
  >(undefined);
  const handleSearch = async (results: SearchModel) => {
    setSearchResults(results.results);
  };
  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {searchResults?.length === 0 && (
        <div className="border border-gray-700 rounded-md p-4">
          <h3 className="text-lg font-medium py-5">No results found</h3>
        </div>
      )}
      <div className="md:grid grid-cols-2 gap-4 flex flex-col py-10">
        {searchResults &&
          searchResults.map((result) => (
            <div
              key={result.id}
              className="border border-gray-700 rounded-md p-4 hover:bg-gray-900"
            >
              <Link href={result.url}>
                <Shimmer
                  src={result.image}
                  alt={result.name}
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </Link>
              <h3 className="text-lg font-medium py-5">{result.name}</h3>
              <p className="pb-5">
                <span className="font-bold text-lg">{result.score}</span>
                {result.highlights.length > 0 && (
                  <span
                    className="line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: result.highlights[0] }}
                  ></span>
                )}
              </p>
              <Link href={result.url} className="underline">
                View Details
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
