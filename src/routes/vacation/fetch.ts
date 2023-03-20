import { runQuery } from "@/graphql/graphql";
import { getWorkers } from "../workers/fetch";
import { vacationsQuery, workerByIdQuery } from "./query";
import {
  vacationCreateMutation,
  vacationUpdateMutation,
  vacationDeleteMutation,
} from "./mutation";
import type {
  VacationFetchInterface,
  VacationModalFormInterface,
  WorkerFetchInterface,
} from "./types";
import type { VacationType } from "../workers/types";

const getDayOffs = async (): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationsQuery,
    label: "dayOffs",
    variables: { type: "dayOff" },
  });

const getVacations = async (): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationsQuery,
    label: "vacations",
    variables: { type: "vacation" },
  });

const getPremiumLicenses = async (): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationsQuery,
    label: "premiumLicenses",
    variables: { type: "license" },
  });

const getWorkerById = async ({
  _id,
}: {
  _id: string;
}): Promise<WorkerFetchInterface> =>
  runQuery({ query: workerByIdQuery, variables: { _id }, label: "workerById" });

const createVacation = async (
  vacationInput: VacationModalFormInterface
): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationCreateMutation,
    variables: { vacationInput },
    label: "createVacation",
  });

const updateVacation = async (
  vacationInput: VacationModalFormInterface
): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationUpdateMutation,
    variables: { vacationInput },
    label: "updateVacation",
  });

const deleteVacation = async (_id: string): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationDeleteMutation,
    variables: { _id },
    label: "deleteVacation",
  });

const getVacationsByType = async (
  type: VacationType
): Promise<VacationFetchInterface> => {
  if (type === "dayOff") return getDayOffs();
  if (type === "vacation") return getVacations();
  if (type === "license") return getPremiumLicenses();
  return { data: undefined };
};

export {
  getVacationsByType,
  getWorkerById,
  getWorkers,
  createVacation,
  deleteVacation,
  updateVacation,
};
