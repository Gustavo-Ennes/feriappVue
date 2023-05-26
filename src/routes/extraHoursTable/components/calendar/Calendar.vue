<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12">
      <p class="h4 pb-3 text-secondary">
        Total:
        <span class="h2 text-primary ml-4">{{ workerHoursSum }}</span>
      </p>
    </div>
  </div>
  <div
    class="row g-2 text-center bg-primary text-light rounded align-items-center"
  >
    <div v-for="day in days" :class="`col h-100 pb-2 text-${['Sábado', 'Domingo'].includes(day) ? 'warning' : 'light'}`">
      {{ day }}
    </div>
  </div>
  <div class="row gap-3 g-5 mt-3 align-items-center justify-content-center">
    <CalendarWeek
      v-for="week in calendarMatrix"
      :days="week"
      :worker="worker"
      @add-to-modified="handleAddToModified"
    />
  </div>
</template>

<script lang="ts">
import { format, getDaysInMonth, getWeekOfMonth, isSameDay, set } from "date-fns";

import CalendarWeek from "./components/CalendarWeek.vue";
import type { CalendarMatrixConfig, ExtraHourCalendarData } from "./types";
import type { ExtraHourInput, ExtraHour } from "../../types";
import { sum } from "ramda";
import { capitalizeName } from "@/routes/utils";

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
  },
  emits: ["addToModified", "cleanModified"],
  data(): ExtraHourCalendarData {
    return {
      calendarMatrix: [],
      modified: [],
    };
  },
  computed: {
    capitalizedWorkerName() {
      return capitalizeName(this.worker.name);
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
  methods: {
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
      return format(day, "EEEE")
    },
    handleAddToModified(extraHour: ExtraHourInput) {
      this.$emit("addToModified", extraHour);
    },
  },
  watch: {
    worker() {
      this.getMatrix();
      this.$emit("cleanModified")
    },
    extraHours: {
      handler() {
        this.getMatrix();
      },
      deep: true,
    },
  },
  components: { CalendarWeek },
};
</script>
