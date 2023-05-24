import { runQuery } from "@/graphql/graphql";
import {
  createExtraHourMutation,
  deleteExtraHourMutation,
  updateExtraHourMutation,
} from "./mutation";
import type { ExtraHourFetch, ExtraHourInput } from "./types";
import { extraHoursQuery } from "./query";
import { buildExtraHoursWithRangeVariables } from "./utils";

const getExtraHoursWithRange = async (
  reference: Date
): Promise<ExtraHourFetch> => {
  return runQuery({
    query: extraHoursQuery,
    label: "extraHoursWithRangeQuery",
    variables: buildExtraHoursWithRangeVariables({ reference }),
  });
};

const createExtraHour = async (
  extraHourInput: ExtraHourInput
): Promise<ExtraHourFetch> =>
  runQuery({
    query: createExtraHourMutation,
    variables: { extraHourInput },
    label: "createExtraHour",
  });

const updateExtraHour = async (
  extraHourInput: ExtraHourInput
): Promise<ExtraHourFetch> =>
  runQuery({
    query: updateExtraHourMutation,
    variables: { extraHourInput },
    label: "updateExtraHour",
  });

const deleteExtraHour = async (_id: string): Promise<ExtraHourFetch> =>
  runQuery({
    query: deleteExtraHourMutation,
    variables: { _id },
    label: "deleteExtraHour",
  });

export {
  getExtraHoursWithRange,
  createExtraHour,
  updateExtraHour,
  deleteExtraHour,
};
