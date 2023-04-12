import { runQuery } from "@/graphql/graphql";
import type { WorkerFetchInterface } from "../vacation/types";
import { workerQuery } from "./query";

const workerAndVacations = async ({
  _id,
}: {
  _id: string;
}): Promise<WorkerFetchInterface> =>
  runQuery({ query: workerQuery, variables: { _id }, label: "workerAndVacationsQuery" });

export { workerAndVacations };
