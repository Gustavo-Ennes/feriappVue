<template>
  <div class="row align-items-center">
    <div class="col-4 d-flex justify-content-start align-items-center">
      <p class="h4 m-2 text-secondary">
        Total:
        <span class="h4 text-primary ml-5">
          <i class="fa-regular fa-sun h3 text-warning" />
          {{ workerHoursSum }}
          <i class="fa-solid fa-moon h3 text-dark" />
          {{ workerNightlyHourSum }}
          <small
            :class="`ml-5 text-${
              modifications ? 'warning' : 'secondary'
            }`"
          >
            {{
              modifications ? `Há modificações!` : `Nenhuma modificação`
            }}</small
          >
        </span>
      </p>
    </div>
    <div class="col-4 d-flex align-items-center justify-content-center">
      <button
        :disabled="!reference || !worker"
        class="btn btn-lg mb-3 btn-primary"
        @click="handleSeeReport"
      >
        <i class="fa-solid fa-magnifying-glass text-warning" />
        Ver relatório
      </button>
    </div>
    <div class="col-4 d-flex align-items-center justify-content-end">
      <button
        :disabled="!reference || !worker"
        class="btn btn-lg mb-3 btn-primary"
        @click="handleSeeAuthorization"
      >
        <i class="fa-solid fa-print text-warning" />
        Imprimir autorização de hora extra
      </button>
    </div>
  </div>
  <div
    class="row g-2 text-center bg-primary text-light rounded align-items-center"
  >
    <div
      v-for="day in days"
      :class="`col h-100 pb-2 text-${
        ['Sábado', 'Domingo'].includes(day) ? 'warning' : 'light'
      }`"
    >
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
import {
  format,
  getDaysInMonth,
  getWeekOfMonth,
  isSameDay,
  set,
} from "date-fns";

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
    modifiedQtd: {
      type: Number,
      default: 0,
    },
  },
  emits: ["addToModified", "cleanModified"],
  data(): ExtraHourCalendarData {
    return {
      calendarMatrix: [],
    };
  },
  computed: {
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
  methods: {
    handleSeeReport() {
      if (this.worker && this.reference) {
        this.$router.push({
          name: "pdf",
          params: {
            type: "report",
            _id: this.worker?.department._id,
            reference: format(this.reference, "MM-yyyy"),
          },
        });
      }
    },
    handleSeeAuthorization() {
      this.$router.push({
        name: "pdf",
        params: {
          type: "authorization",
          _id: this.worker._id,
          reference: format(this.reference, "MM-yyyy"),
        },
      });
    },
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
  components: { CalendarWeek },
};
</script>

<style>
small {
  font-size: 17px;
}
</style>
