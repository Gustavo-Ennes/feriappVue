import { firebaseApp } from "@/firebase/firebase";
import { store } from "@/store/store";
import { getAuth, type User } from "firebase/auth";

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
      headers: {
        "Content-Type": "application/json",
        token: store.state.user?.uid ?? "",
      },
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
