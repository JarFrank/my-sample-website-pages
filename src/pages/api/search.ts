import { SearchModel, SearchResult } from "@/components/search-results";
import { queryIndex } from "@/services/search/azure-search";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q: query } = req.query;

  if (!query) {
    return new Response(
      JSON.stringify({ query: "", results: [] } satisfies SearchModel)
    );
  }

  const searchResults = await queryIndex((query as string) ?? "");
  const output: SearchResult[] = [];
  for await (const result of searchResults.byPage()) {
    result.results.map((r) =>
      output.push({
        highlights: r.highlights?.description ?? [],
        score: r.score,
        image: r.document.image,
        name: r.document.name,
        url: r.document.url,
        id: r.document.id,
      })
    );
  }
  const searchResponse: SearchModel = {
    results: output.sort((a, b) => b.score - a.score),
    query: (query as string) ?? "",
  };
  return res.json(searchResponse);
}
