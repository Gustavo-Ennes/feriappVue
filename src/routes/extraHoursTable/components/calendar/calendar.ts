import { getDaysInMonth, set, getWeekOfMonth, isSameDay } from "date-fns";
import type { ExtraHour } from "../../types";
import type { CalendarMatrixConfig } from "./types";

const _getMatrix = (_this: any) => {
  const matrix: {
    day: Date;
    extraHour?: ExtraHour;
  }[][] = [];
  const config: CalendarMatrixConfig = {
    totalDays: getDaysInMonth(_this.reference),
    week: 1,
    weekArray: []
  };

  for (let day = 1; day <= config.totalDays; day++) {
    const dayInstance: Date = set(_this.reference, { date: day });
    const weekOfMonth = getWeekOfMonth(dayInstance);
    if (weekOfMonth === config.week) {
      config.weekArray.push({
        day: dayInstance,
        extraHour: _getExtraHour(_this, day)
      });
    } else {
      config.week++;
      day--;
      matrix.push(config.weekArray);
      config.weekArray = [];
    }
    if (day === config.totalDays && weekOfMonth === config.week) {
      matrix.push(config.weekArray);
    }
  }
  _this.calendarMatrix = matrix;
};

const _getExtraHour = (_this: any, day: number): ExtraHour => {
  const dayDate = set(_this.reference, { date: day });
  return _this.extraHours.filter(
    ({ reference, worker: _worker }: ExtraHour) => {
      return (
        isSameDay(dayDate, new Date(reference)) &&
        _this.worker._id === _worker._id
      );
    }
  )?.[0];
};

export { _getMatrix };
