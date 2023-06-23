<template>
  <div class="row justify-content-center align-items-baseline">
    <div class="col-12 text-center">
      <h4 class="rounded bg-primary text-light mb-3">Feriados</h4>
    </div>
    <div class="col-12">
      <div class="p-1">
        <div
          v-for="week in days"
          :key="`week-${week[0]}`"
          class="row justify-content-center align-items-end"
        >
          <div class="col-3" />
          <div class="col-1" v-for="weekDay in week">
            <CalendarHoliday :day="weekDay" />
          </div>
          <div class="col-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";

import CalendarHoliday from "./CalendarHoliday.vue";

export default {
  name: "CalendarHolidays",
  props: ["calendarMatrix"],
  computed: {
    days() {
      const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const month: (Date | null)[][] = [];
      this.calendarMatrix.forEach((matrixWeek: any) => {
        const week: (Date | null)[] = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ];
        matrixWeek.forEach(({ day: matrixDay }: any) => {
          const dayName = format(matrixDay, "EEEE");
          const dayIndex = weekDays.indexOf(dayName);
          week[dayIndex] = matrixDay;
        });
        month.push(week);
      });
      return month;
    },
  },
  methods: {
    toggleHoliday() {},
  },
  components: { CalendarHoliday },
};
</script>
