import { store } from "@/store/store";

const runQuery = async ({
  query,
  variables,
  label,
}: {
  query: string;
  variables?: any;
  label: string;
}): Promise<any> => {
  store.dispatch("startLoading");

  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query, variables }),
    });
    return response.json();
  } catch (error: any) {
    console.log(`Error fetching ${label}: `, error.message);
  } finally {
    store.dispatch("stopLoading");
  }
};

export { runQuery };
