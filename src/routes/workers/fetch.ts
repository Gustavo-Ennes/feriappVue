import { deleteWorkerMutation } from "./mutation";
import { workersQuery } from "./query";
import { runQuery } from "@/graphql/graphql";

const getWorkers = async (): Promise<any> =>
  runQuery({ query: workersQuery, label: "workers" });

const deleteWorker = async (_id: string) =>
  runQuery({
    query: deleteWorkerMutation,
    label: "deleteWorker",
    variables: { _id },
  });

export { getWorkers, deleteWorker };
