import { config } from "dotenv";
import { queryPages } from "./entries-service";
import { createOrUpdateIndex, pushDataToIndex } from "./azure-search";
config();

console.log("Creating index in Azure Cognitive Search...");

void (async function importData() {
  try {
    console.log("Fetching data from Contentful...");
    const pages = await queryPages();

    console.log("Creating index in Azure Cognitive Search...");
    await createOrUpdateIndex();

    console.log("Uploading data to Azure Cognitive Search...");
    await pushDataToIndex(pages);

    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
})();
