import { runQuery } from "@/graphql/graphql";
import { searchQuery } from "./query";
import type { SearchResultsFetchInterface } from "./types";

const getSearchResults = async (
  searchTerm: string
): Promise<SearchResultsFetchInterface> =>
  runQuery({
    query: searchQuery,
    variables: { searchTerm },
    label: "searchQuery"
  });

export { getSearchResults };
