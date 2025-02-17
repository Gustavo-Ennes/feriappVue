import { isAfter, isWithinInterval, isBefore, add } from "date-fns";
import type { Vacation, VacationPagination } from "./types";

const futureVacations = (pagination: VacationPagination): Vacation[] => {
  const vacations = pagination?.items;
  return vacations?.length
    ? vacations.filter((vacation: Vacation) => {
        return isAfter(new Date(vacation.startDate), getTomorrow());
      })
    : [];
};
const presentVacations = (pagination: VacationPagination): Vacation[] => {
  const vacations = pagination?.items;
  return vacations?.length
    ? vacations.filter((vacation: Vacation) => {
        const today = new Date();
        const vacationStart = new Date(vacation.startDate);
        const vacationEnd = new Date(vacation.endDate as string);
        return isWithinInterval(today, {
          start: vacationStart,
          end: vacationEnd
        });
      })
    : [];
};
const pastVacations = (pagination: VacationPagination): Vacation[] => {
  const vacations = pagination?.items;
  return vacations?.length
    ? vacations?.filter((vacation: Vacation) =>
        isBefore(new Date(vacation.endDate as string), getYesterday())
      )
    : [];
};
const getYesterday = (): Date => {
  const today: Date = new Date();
  return add(today, {
    hours: -today.getHours(),
    minutes: -today.getMinutes(),
    seconds: -today.getSeconds() + 1
  });
};
const getTomorrow = (): Date => {
  const today: Date = new Date();
  return add(today, {
    hours: 24 - today.getHours(),
    minutes: -today.getMinutes(),
    seconds: -today.getSeconds() - 1
  });
};

export { futureVacations, pastVacations, presentVacations };
