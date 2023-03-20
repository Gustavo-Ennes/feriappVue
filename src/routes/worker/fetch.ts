import { runQuery } from "@/graphql/graphql";
import type { WorkerFetchInterface } from "../vacation/types";
import { workerByIdQuery } from "./query";

const getWorkerById = async ({
  _id,
}: {
  _id: string;
}): Promise<WorkerFetchInterface> =>
  runQuery({ query: workerByIdQuery, variables: { _id }, label: "workerById" });

export { getWorkerById };
