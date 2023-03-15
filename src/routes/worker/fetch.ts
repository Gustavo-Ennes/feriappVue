import type { WorkerCreatePayloadInterface } from "./types";
import { createWorkerMutation, updateWorkerMutation } from "./mutation";
import { workersQuery, departmentQuery } from "./query";
import { runQuery } from "@/graphql/graphql";
import { deleteWorkerMutation } from "./components/WorkerTable/components/mutation";

const getWorkers = async (): Promise<any> =>
  runQuery({ query: workersQuery, label: "workers" });

const getDepartments = async (): Promise<any> =>
  runQuery({ query: departmentQuery, label: "departments" });

const createWorker = async (
  workerPayload: WorkerCreatePayloadInterface
): Promise<any> =>
  runQuery({
    query: createWorkerMutation,
    label: "createWorker",
    variables: {
      workerInput: workerPayload,
    },
  });

const updateWorker = async (
  workerPayload: WorkerCreatePayloadInterface
): Promise<any> =>
  runQuery({
    query: updateWorkerMutation,
    label: "updateWorker",
    variables: { workerInput: workerPayload },
  });

const deleteWorker = async(
  _id: string
) => runQuery({query: deleteWorkerMutation, label: "deleteWorker", variables: { _id }})



export { createWorker, getDepartments, updateWorker, getWorkers, deleteWorker };
