<template>
  <div class="row align-items-baseline">
    <div class="col-4 d-flex justify-content-stretch align-items-stretch">
      <CalendarInfo
        :worker-hours-sum="workerHoursSum"
        :worker-nightly-hours-sum="workerNightlyHourSum"
        :extracted-departments="extractedDepartments"
        :worker="worker"
      />
    </div>
    <div class="col-4 d-flex align-items-center justify-content-center">
      <CalendarHolidays :calendar-matrix="calendarMatrix" />
    </div>
    <div class="col-4 d-flex align-items-center justify-content-end">
      <CalendarButtons
        :dropdown="dropdown"
        :extracted-departments="extractedDepartments"
        :worker="worker"
        :reference="reference"
      />
    </div>
  </div>
  <CalendarHeader :days="days" class="mt-3" />
  <div class="row gap-3 g-5 mt-3 align-items-center justify-content-center">
    <CalendarWeek
      v-for="week in calendarMatrix"
      :days="week"
      :worker="worker"
      :departments="departments"
      @add-to-modified="handleAddToModified"
    />
  </div>
</template>

<script lang="ts">
import {
  format,
  getDaysInMonth,
  getWeekOfMonth,
  isSameDay,
  set,
} from "date-fns";
import { Dropdown } from "bootstrap";

import CalendarWeek from "./components/CalendarWeek.vue";
import CalendarInfo from "./components/CalendarInfo.vue";
import CalendarHeader from "./components/CalendarHeader.vue";
import CalendarHolidays from "./components/CalendarHolidays.vue";
import CalendarButtons from "./components/CalendarButtons.vue";
import type { CalendarMatrixConfig, ExtraHourCalendarData } from "./types";
import type { ExtraHourInput, ExtraHour } from "../../types";
import { sum } from "ramda";
import { extractDepartments } from "../../utils";
import { capitalizeName } from "@/routes/utils";
import type { Department } from "@/routes/departments/types";

export default {
  name: "ExtraHourCalendar",
  props: {
    extraHours: {
      type: Array<ExtraHour>,
      default: [],
    },
    reference: {
      type: Date,
      required: true,
    },
    worker: {
      type: Object,
      default: null,
    },
    modifiedQtd: {
      type: Number,
      default: 0,
    },
    departments: {
      type: Array<Department>,
      default: [],
    },
  },
  emits: ["addToModified", "cleanModified"],
  data(): ExtraHourCalendarData {
    return {
      calendarMatrix: [],
      dropdown: undefined,
    };
  },
  computed: {
    extractedDepartments() {
      const departments = extractDepartments(this.extraHours);
      return departments;
    },
    modifications() {
      return this.modifiedQtd;
    },
    capitalizedWorkerName() {
      return capitalizeName(this.worker.name);
    },
    workerNightlyHourSum() {
      const extraHours: number[] = [];
      this.calendarMatrix.forEach((week) => {
        week.forEach((day) => {
          extraHours.push(day.extraHour?.nightlyAmount ?? 0);
        });
      });
      return sum(extraHours);
    },
    workerHoursSum() {
      const extraHours: number[] = [];
      this.calendarMatrix.forEach((week) => {
        week.forEach((day) => {
          extraHours.push(day.extraHour?.amount ?? 0);
        });
      });
      return sum(extraHours);
    },
    days() {
      return [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ];
    },
  },
  beforeMount() {
    this.getMatrix();
  },
  mounted() {
    const dropdown: HTMLElement | null =
      document.querySelector(".dropdown-toggle");
    if (dropdown) {
      this.dropdown = new Dropdown(dropdown as HTMLElement);
    }
  },
  methods: {
    format,
    getMatrix() {
      const matrix: {
        day: Date;
        extraHour?: ExtraHour;
      }[][] = [];
      const config: CalendarMatrixConfig = {
        totalDays: getDaysInMonth(this.reference),
        week: 1,
        weekArray: [],
      };

      for (let day = 1; day <= config.totalDays; day++) {
        const dayInstance: Date = set(this.reference, { date: day });
        const weekOfMonth = getWeekOfMonth(dayInstance);
        if (weekOfMonth === config.week) {
          config.weekArray.push({
            day: dayInstance,
            extraHour: this.getExtraHour(day),
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
      this.calendarMatrix = matrix;
    },
    getExtraHour(day: number): ExtraHour {
      const dayDate = set(this.reference, { date: day });
      return this.extraHours.filter(({ reference, worker: _worker }) => {
        return (
          isSameDay(dayDate, new Date(reference)) &&
          this.worker._id === _worker._id
        );
      })?.[0];
    },
    weekDayName(day: Date) {
      return format(day, "EEEE");
    },
    handleAddToModified(extraHour: ExtraHourInput) {
      this.$emit("addToModified", extraHour);
    },
  },
  watch: {
    worker() {
      this.getMatrix();
      this.$emit("cleanModified");
    },
    extraHours: {
      handler() {
        this.getMatrix();
      },
      deep: true,
    },
  },
  components: {
    CalendarWeek,
    CalendarInfo,
    CalendarHeader,
    CalendarHolidays,
    CalendarButtons,
  },
};
</script>

<style>
small {
  font-size: 17px;
}
</style>
