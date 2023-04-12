import type { Offcanvas } from "bootstrap";
import type { Vacation } from "../vacation/types";

type VacationDataType = {
  vacations?: Vacation[];
};

type HomeDataType = {
  offcanvas?: Offcanvas;
};

export type { VacationDataType, HomeDataType };
