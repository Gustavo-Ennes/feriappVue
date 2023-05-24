<template>
  <div class="row justify-content-center">
    <div v-for="dayName in weekDays" class="col justify-self-center">
      <CalendarDay
        :extra-hour="getData(dayName)"
        :day="getDay(dayName)"
        :worker="worker"
        @add-to-modified="handleAddToModified"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";

import CalendarDay from "./CalendarDay.vue";
import type {
  ExtraHour,
  ExtraHourInput,
} from "../../../types";
import type { CalendarDayType } from "../types";

export default {
  name: "ExtraHourCalendarWeek",
  props: {
    days: {
      type: Array<{ day: Date; extraHour?: ExtraHour }>,
      default: [],
    },
    worker: {
      type: Object,
      default: null,
    },
  },
  emits: ["addToModified"],
  computed: {
    weekDays() {
      return [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
    },
  },
  methods: {
    getData(dayName: string): ExtraHour | undefined {
      return this.days.filter(
        ({ day }: CalendarDayType) =>
          format(day, "EEEE")?.toLowerCase() === dayName
      )?.[0]?.extraHour;
    },
    getDay(dayName: string): Date | undefined {
      return this.days.filter(
        ({ day }) => format(day, "EEEE")?.toLowerCase() === dayName
      )?.[0]?.day;
    },
    handleAddToModified(extraHour: ExtraHourInput) {
      this.$emit("addToModified", extraHour);
    },
  },
  components: { CalendarDay },
};
</script>
