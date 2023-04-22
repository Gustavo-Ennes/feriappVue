import type { Vacation } from "../vacation/types";

const getVacations = (vacations: Vacation[]): Vacation[] =>
  vacations.filter((vacation) => vacation.type === "vacation");
const getLicenses = (vacations: Vacation[]): Vacation[] =>
  vacations.filter((vacation) => vacation.type === "license");
const getDayOffs = (vacations: Vacation[]): Vacation[] =>
  vacations.filter((vacation) => vacation.type === "dayOff");

export { getVacations, getLicenses, getDayOffs };
