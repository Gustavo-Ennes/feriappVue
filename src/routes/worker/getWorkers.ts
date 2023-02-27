import { store } from "@/store/store";

import { workersQuery } from "./query";

const getWorkers = async (): Promise<any> => {
  store.dispatch("startLoading");
  try {
    const workers = await fetch("http://35.247.252.32/graphql", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: workersQuery }),
    });
    return workers.json();
  } catch (error: any) {
    console.log("Error fetching workers: ", error.message);
  } finally {
    store.dispatch("stopLoading");
  }
};

export {
  getWorkers,
};
