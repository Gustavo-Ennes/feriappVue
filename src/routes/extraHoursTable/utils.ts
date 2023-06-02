import { parse, getDaysInMonth, format, set, sub } from "date-fns";
import type {
  BuildExtraHoursWithRangeVariables,
  ExtraHourInputWrapper,
} from "./types";

const buildExtraHoursWithRangeVariables = ({
  reference,
}: BuildExtraHoursWithRangeVariables): ExtraHourInputWrapper | void => {
  try {
    const firstDay = set(reference, {
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const lastDay = set(reference, {
      date: getDaysInMonth(reference),
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    });

    return {
      extraHourInput: {
        from: firstDay.toISOString(),
        to: lastDay.toISOString(),
      },
    };
  } catch (err: any) {
    console.log(
      "Error at buildExtraHoursByRefVariables function: ",
      err.message
    );
  }
};

const getReference = () => new Date();

export { buildExtraHoursWithRangeVariables, getReference };
