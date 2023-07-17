import { IndexDocumentsBatch } from "@azure/search-documents";
import {
  SearchClient,
  SearchIndexClient,
  AzureKeyCredential,
} from "@azure/search-documents";
import { getIndexSchema } from "./azure-search-index-schema";

export type SearchSchema = {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
};

const getSearchEndpoint = () =>
  `https://${
    process.env.AZURE_SEARCH_SERVICE_NAME as string
  }.search.windows.net`;
const getSearchKey = () => process.env.AZURE_SEARCH_ADMIN_KEY as string;
const getSearchIndexName = () => process.env.AZURE_SEARCH_INDEX_NAME as string;

let clientinstance: SearchClient<SearchSchema>;
const client = () =>
  clientinstance ??
  (clientinstance = new SearchClient<SearchSchema>(
    getSearchEndpoint(),
    getSearchIndexName(),
    new AzureKeyCredential(getSearchKey())
  ));

let clientIndexInstance: SearchIndexClient;
const clientIndex = () =>
  clientIndexInstance ??
  (clientIndexInstance = new SearchIndexClient(
    getSearchEndpoint(),
    new AzureKeyCredential(getSearchKey())
  ));

export const deleteIndex = async () => {
  await clientIndex().deleteIndex(getSearchIndexName());
};

export async function createOrUpdateIndex() {
  await clientIndex().createOrUpdateIndex(getIndexSchema(getSearchIndexName()));
}

export const pushDataToIndex = async (
  documents: SearchSchema[],
  batchSize = 100
) => {
  const documentBatches: SearchSchema[][] = [];
  for (let i = 0; i < documents.length; i += batchSize) {
    documentBatches.push(documents.slice(i, i + batchSize));
  }
  for (const documentBatch of documentBatches) {
    const batch = new IndexDocumentsBatch<SearchSchema>();
    batch.upload(documentBatch);
    await client().indexDocuments(batch);
  }
};

export const queryIndex = async (query: string) => {
  const results = await client().search(query, {
    queryType: "semantic",
    speller: "lexicon",
    queryLanguage: "en-us",
    includeTotalCount: true,
    highlightFields: ["name", "description"].join(","),
  });
  return results.results;
};
