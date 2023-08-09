import { runQuery } from "@/graphql/graphql";
import { processExtraHoursMutation } from "./mutation";
import type { ExtraHourFetch, ExtraHourProcessData } from "./types";
import { extraHoursQuery, referenceQuery } from "./query";
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

const processExtraHours = async (
  extraHourInput: ExtraHourProcessData[]
): Promise<ExtraHourFetch> =>
  runQuery({
    query: processExtraHoursMutation,
    variables: { extraHourInput },
    label: "processExtraHour",
  });

const extraHoursReferences = async (): Promise<ExtraHourFetch> =>
  runQuery({
    query: referenceQuery,
    label: "ExtraHourReferences",
  });

export { getExtraHoursWithRange, processExtraHours, extraHoursReferences };
