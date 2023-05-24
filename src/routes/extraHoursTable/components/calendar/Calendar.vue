<template>
  <div
    class="row g-2 text-center bg-primary text-light rounded align-items-center"
  >
    <div v-for="day in days" class="col h-100 pb-2">
      {{ day }}
    </div>
  </div>
  <div class="row gap-1 mt-3 align-items-center">
    <CalendarWeek
      v-for="week in calendarMatrix"
      :days="week"
      :worker="worker"
      @add-to-modified="handleAddToModified"
    />
  </div>
</template>

<script lang="ts">
import { getDaysInMonth, getWeekOfMonth, isSameDay, set } from "date-fns";

import CalendarWeek from "./components/CalendarWeek.vue";
import type { CalendarMatrixConfig, ExtraHourCalendarData } from "./types";
import type { ExtraHourInput, ExtraHour } from "../../types";

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
  emits: ["addToModified"],
  data(): ExtraHourCalendarData {
    return {
      calendarMatrix: [],
      modified: [],
    };
  },
  computed: {
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
    handleAddToModified(extraHour: ExtraHourInput) {
      this.$emit("addToModified", extraHour);
    },
  },
  watch: {
    worker() {
      this.getMatrix();
    },
    extraHours() {
      this.getMatrix();
    },
  },
  components: { CalendarWeek },
};
</script>
