import type { Department } from "@/routes/departments/types";
import type { ExtraHour } from "../../types";
import type { Dropdown } from "bootstrap";

type ExtraHourCalendarData = {
  calendarMatrix: CalendarDayType[][];
  dropdown?: Dropdown
};

type CalendarDayType = {
  day: Date;
  extraHour?: ExtraHour;
};

type CalendarMatrixConfig = {
  totalDays: number;
  week: number;
  weekArray: CalendarDayType[];
};

type CalendarDayData = {
  canEdit: boolean;
  newValue?: number;
  newNightlyValue?: number;
  newDepartment?: Department;
  isHoliday: boolean;
};

type CalendarHolidayMonth = {
  reference: string;
  days: number[];
};

type CalendarHolidayStorage = {
  months: CalendarHolidayMonth[];
};

export type {
  ExtraHourCalendarData,
  CalendarMatrixConfig,
  CalendarDayData,
  CalendarDayType,
  CalendarHolidayMonth,
  CalendarHolidayStorage,
};
