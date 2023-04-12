import type { Vacation } from "@/routes/vacation/types";
import { isWithinInterval, add, isPast, isFuture } from "date-fns";
import type { Worker } from "@/routes/workers/types";

const nextVacations = (vacations: Vacation[]): Vacation[] => {
  console.log("🚀 ~ file: utils.ts:5 ~ nextVacations ~ vacations:", vacations);
  return vacations.filter((vacation) =>
    isWithinInterval(new Date(vacation.startDate), {
      start: new Date(),
      end: add(new Date(), { days: 5 }),
    })
  );
};
const pastVacations = (vacations: Vacation[]): Vacation[] =>
  vacations.filter((vacation) =>
    isWithinInterval(new Date(vacation.endDate as string), {
      start: new Date(),
      end: add(new Date(), { days: 5 }),
    })
  );

const presentVacations = (vacations: Vacation[]): Vacation[] =>
  vacations.filter(
    (vacation) =>
      isPast(new Date(vacation.startDate)) &&
      isFuture(new Date(vacation.endDate as string))
  );

const getWorkerStatus = (worker: Worker): string | void => {
  console.log("🚀 ~ file: utils.ts:30 ~ getWorkerStatus ~ worker:", worker);
  if (worker.status === "license") return "de licença prêmio";
  else if (worker.status === "vacation") return "de férias";
  else if (worker.status === "dayOff") return "abonando";
};
export { nextVacations, pastVacations, presentVacations, getWorkerStatus };
