import { runQuery } from "@/graphql/graphql";
import { getWorkers } from "../workers/fetch";
import { bossesQuery, vacationsQuery, workerByIdQuery } from "./query";
import {
  vacationCreateMutation,
  vacationUpdateMutation,
  vacationDeleteMutation
} from "./mutation";
import type {
  Boss,
  BossFetchInterface,
  VacationFetchInterface,
  VacationModalFormInterface,
  WorkerFetchInterface
} from "./types";
import type { VacationType } from "../workers/types";

const getDayOffs = async (page:number = 1): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationsQuery,
    label: "dayOffs",
    variables: { type: "dayOff", page }
  });

const getVacations = async (page: number = 1): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationsQuery,
    label: "vacations",
    variables: { type: "vacation", page }
  });

const getPremiumLicenses = async (page: number = 1): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationsQuery,
    label: "premiumLicenses",
    variables: { type: "license", page }
  });

const getWorkerById = async ({
  _id
}: {
  _id: string;
}): Promise<WorkerFetchInterface> =>
  runQuery({ query: workerByIdQuery, variables: { _id }, label: "workerById" });

const getBosses = async () => runQuery({ query: bossesQuery, label: "bosses" });

const getBoss = async ({
  isDirector = false
}: {
  isDirector: boolean;
}): Promise<Boss | undefined> => {
  const {
    data: { bosses }
  }: BossFetchInterface = await getBosses();

  return bosses?.filter((boss) => boss.isDirector === isDirector)?.[0];
};

const createVacation = async (
  vacationInput: VacationModalFormInterface
): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationCreateMutation,
    variables: { vacationInput },
    label: "createVacation"
  });

const updateVacation = async (
  vacationInput: VacationModalFormInterface
): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationUpdateMutation,
    variables: { vacationInput },
    label: "updateVacation"
  });

const deleteVacation = async (_id: string): Promise<VacationFetchInterface> =>
  runQuery({
    query: vacationDeleteMutation,
    variables: { _id },
    label: "deleteVacation"
  });

const getVacationsByType = async (
  type: VacationType,
  page: number = 1
): Promise<VacationFetchInterface> => {
  if (type === "dayOff") return await getDayOffs(page);
  if (type === "vacation") return await getVacations(page);
  if (type === "license") return await getPremiumLicenses(page);
  return { data: undefined };
};

export {
  getBoss,
  getBosses,
  getVacationsByType,
  getVacations,
  getWorkerById,
  getWorkers,
  createVacation,
  deleteVacation,
  updateVacation
};
