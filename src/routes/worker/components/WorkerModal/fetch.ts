import { store } from "@/store/store";

import type { WorkerCreatePayloadInterface } from "../../types";
import { departmentQuery } from "./query";
import { createWorkerMutation } from "./mutation";

const getDepartments = async (): Promise<any> => {
  store.dispatch("startLoading");
  try {
    const departments = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: departmentQuery }),
    });
    return departments.json();
  } catch (error: any) {
    console.log("Error fetching departments: ", error.message);
  } finally {
    store.dispatch("stopLoading");
  }
};

const createWorker = async (
  workerPayload: WorkerCreatePayloadInterface
): Promise<any> => {
  const variables = {
    workerInput: workerPayload,
  };
  console.log("🚀 ~ file: createWorker.ts:11 ~ variables:", variables);

  store.dispatch("startLoading");

  try {
    const createdWorker = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: createWorkerMutation, variables }),
    });
    return createdWorker.json();
  } catch (error: any) {
    console.log("Error create workers: ", error.message);
  } finally {
    store.dispatch("stopLoading");
  }
};

export { createWorker, getDepartments };
