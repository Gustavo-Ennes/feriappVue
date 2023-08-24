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
      :key="JSON.stringify(week)"
      @add-to-modified="handleAddToModified"
    />
  </div>
</template>

<script lang="ts">
import { format, isSameMonth } from "date-fns";
import { Dropdown } from "bootstrap";
import { filter, sum } from "ramda";

import CalendarWeek from "./components/CalendarWeek.vue";
import CalendarInfo from "./components/CalendarInfo.vue";
import CalendarHeader from "./components/CalendarHeader.vue";
import CalendarHolidays from "./components/CalendarHolidays.vue";
import CalendarButtons from "./components/CalendarButtons.vue";
import type { ExtraHourCalendarData } from "./types";
import type { ExtraHourInput, ExtraHour } from "../../types";
import { extractDepartments } from "../../utils";
import { capitalizeName } from "@/routes/utils";
import type { Department } from "@/routes/departments/types";
import { _getMatrix } from "./calendar";

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
      const extraHourFilter = (he: ExtraHour) =>
        he.worker._id === this.worker._id &&
        isSameMonth(new Date(this.reference), new Date(he.reference));
      const filteredExtraHours = filter(extraHourFilter, this.extraHours);
      const departments = extractDepartments(filteredExtraHours);
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
      _getMatrix(this);
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
./calendar
