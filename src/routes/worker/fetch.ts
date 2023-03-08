import { store } from "@/store/store";

import type { WorkerCreatePayloadInterface } from "./types";
import { departmentQuery } from "./query";
import { createWorkerMutation, updateWorkerMutation } from "./mutation";
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

  store.dispatch("startLoading");

  try {
    const createdWorker = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: createWorkerMutation, variables }),
    });
    return createdWorker.json();
  } catch (error: any) {
    console.log("Error create worker: ", error.message);
  } finally {
    store.dispatch("stopLoading");
  }
};

const updateWorker = async (
  workerPayload: WorkerCreatePayloadInterface
): Promise<any> => {
  const variables = {
    workerInput: workerPayload,
  };

  store.dispatch("startLoading");

  try {
    const updateResponse = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: updateWorkerMutation, variables }),
    });

    return updateResponse.json();
  } catch (error: any) {
    console.log("Error update worker: ", error.message);
  } finally {
    store.dispatch("stopLoading");
  }
};

export { createWorker, getDepartments, updateWorker, getWorkers };
