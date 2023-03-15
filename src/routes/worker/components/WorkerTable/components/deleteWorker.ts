import { store } from "../../../../../store/store";
import { deleteWorkerMutation } from "./mutation";

const deleteWorker = async ({ _id }: { _id: string }): Promise<void> => {
  const variables = {
    _id,
  };

  store.dispatch("startLoading");
  try {
    const deleteResponse = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: deleteWorkerMutation, variables }),
    });

    return deleteResponse.json();
  } catch (error: any) {
    console.log("Error delete worker: ", error.message);
  } finally {
    store.dispatch("stopLoading");
  }
};

export { deleteWorker };
