import type { SearchIndex } from "@azure/search-documents";

export const getIndexSchema = (indexName: string) => {
  const searchIndex: SearchIndex = {
    name: indexName,
    fields: [
      {
        name: "id",
        type: "Edm.String",
        key: true,
        filterable: true,
        sortable: true,
        facetable: true,
        searchable: true,
      },
      {
        name: "url",
        type: "Edm.String",
        filterable: true,
        sortable: true,
        facetable: true,
        searchable: true,
      },
      {
        name: "image",
        type: "Edm.String",
        filterable: true,
        sortable: true,
        facetable: true,
        searchable: true,
      },
      {
        name: "name",
        type: "Edm.String",
        filterable: true,
        sortable: true,
        facetable: true,
        searchable: true,
      },
      {
        name: "description",
        type: "Edm.String",
        filterable: true,
        sortable: true,
        facetable: true,
        searchable: true,
        analyzerName: "en.lucene",
      },
    ],
  };
  return searchIndex;
};
