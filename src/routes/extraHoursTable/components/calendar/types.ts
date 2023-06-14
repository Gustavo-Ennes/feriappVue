import type { ExtraHour, ExtraHourInput } from "../../types";

type ExtraHourCalendarData = {
  calendarMatrix: CalendarDayType[][];
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
