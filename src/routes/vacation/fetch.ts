import { runQuery } from "@/graphql/graphql";

import { vacationsQuery, workerByIdQuery } from "./query";
import type { VacationFetchInterface, WorkerFetchInterface } from "./types";

const getVacations = (): Promise<VacationFetchInterface> =>
  runQuery({ query: vacationsQuery, label: "vacations" });
const getWorkerById = ({
  _id,
}: {
  _id: string;
}): Promise<WorkerFetchInterface> =>
  runQuery({ query: workerByIdQuery, variables: { _id }, label: "workerBtId" });

export { getVacations, getWorkerById };
