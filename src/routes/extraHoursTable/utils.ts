import { getDaysInMonth, isSameMonth, isSameYear, set } from "date-fns";
import { uniqBy, prop, without, includes } from "ramda";

import type {
  BuildExtraHoursWithRangeVariables,
  ExtraHour,
  ExtraHourInputWrapper,
} from "./types";
import type { Department } from "../workers/types";
import type {
  CalendarHolidayStorage,
  CalendarHolidayMonth,
} from "./components/calendar/types";

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

const extractDepartments = (extraHours: ExtraHour[]): Department[] => {
  const departments: Department[] = [];
  extraHours.forEach((extraHour: ExtraHour) => {
    if (extraHour.department) {
      departments.push(extraHour.department as Department);
    }
  });
  return uniqBy(prop("_id"), departments);
};

const getHolidayMonths = (): CalendarHolidayStorage => {
  return JSON.parse(
    localStorage.getItem("calendarHolidays") ?? '{"months": []}'
  );
};
const getHolidayReferenceMonth = ({
  day,
}: {
  day: Date;
}): CalendarHolidayMonth | void => {
  return getHolidayMonths().months.filter(
    ({ reference }: CalendarHolidayMonth) =>
      isSameMonth(new Date(reference), day as Date) &&
      isSameYear(new Date(reference), day as Date)
  )?.[0];
};
const writeHolidayMonths = (months: CalendarHolidayMonth[]) => {
  localStorage.setItem("calendarHolidays", JSON.stringify({ months }));
};
const addToLocalStorage = ({ day }: { day: Date }) => {
  const { months } = getHolidayMonths();
  const thisReferenceMonth = getHolidayReferenceMonth({ day });
  const newMonths = without([thisReferenceMonth], months);
  const dayNumber = day?.getDate() ?? 0;

  if (
    thisReferenceMonth &&
    dayNumber &&
    !thisReferenceMonth.days.includes(dayNumber)
  ) {
    thisReferenceMonth.days.push(dayNumber);
    newMonths.push(thisReferenceMonth);
  } else if (!thisReferenceMonth && dayNumber) {
    newMonths.push({
      reference: day?.toISOString() as string,
      days: [dayNumber],
    });
  }
  writeHolidayMonths(newMonths);
};
const removeFromLocalStorage = ({ day }: { day: Date }) => {
  const referenceMonth = getHolidayReferenceMonth({ day });
  const { months } = getHolidayMonths();
  if (!referenceMonth) return;
  else {
    const newMonths = without([referenceMonth], months);
    referenceMonth.days.splice(
      referenceMonth.days.indexOf(day?.getDate() as number),
      1
    );
    newMonths.push(referenceMonth);
    writeHolidayMonths(newMonths);
  }
};

const checkIsHoliday = ({ day }: { day: Date }) => {
  if (day) {
    const actualMonthReference = getHolidayReferenceMonth({
      day,
    });
    return actualMonthReference && day
      ? includes(day.getDate(), actualMonthReference.days)
      : false;
  }
  return false;
};

export {
  buildExtraHoursWithRangeVariables,
  getReference,
  extractDepartments,
  getHolidayReferenceMonth,
  addToLocalStorage,
  removeFromLocalStorage,
  checkIsHoliday,
};
