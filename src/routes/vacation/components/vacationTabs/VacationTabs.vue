<template>
  <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
    <VacationTabHeader type="future" :active="true" />
    <VacationTabHeader type="present" />
    <VacationTabHeader type="past" />
  </ul>

  <div class="tab-content">
    <VacationTabBody
      type="future"
      :vacations="futureVacations()"
      :active="true"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="present"
      :vacations="presentVacations()"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="past"
      :vacations="pastVacations()"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
  </div>
</template>

<script lang="ts">
import VacationTabHeader from "./VacationTabHeader.vue";
import VacationTabBody from "./VacationTabBody.vue";
import { isAfter, isBefore, add, isWithinInterval } from "date-fns";
import type { Vacation } from "../../types";

export default {
  name: "VacationTabs",
  props: ["vacations"],
  emits: ["selectVacation", "openModal", "deleteVacation"],
  components: { VacationTabHeader, VacationTabBody },
  methods: {
    handleEdit(vacation: Vacation): void {
      this.$emit("selectVacation", vacation);
      this.$emit("openModal", "edit");
    },
    handleDelete(vacation: Vacation): void {
      this.$emit("selectVacation", vacation);
      this.$emit("deleteVacation", vacation._id);
    },
    futureVacations(): Vacation[] {
      return this.vacations.filter((vacation: Vacation) =>
        isAfter(new Date(vacation.startDate), this.getTomorrow())
      );
    },
    presentVacations(): Vacation[] {
      return this.vacations.length
        ? this.vacations.filter((vacation: Vacation) => {
            console.log(
              "🚀 ~ file: VacationTabs.vue:82 ~ returnthis.vacations.filter ~ vacation:",
              vacation
            );
            const today = new Date();
            console.log(
              "🚀 ~ file: VacationTabs.vue:81 ~ returnthis.vacations.filter ~ today:",
              today
            );
            const vacationStart = new Date(vacation.startDate);
            console.log(
              "🚀 ~ file: VacationTabs.vue:82 ~ returnthis.vacations.filter ~ vacationStart:",
              vacationStart
            );
            const vacationEnd = new Date(vacation.endDate as string);
            console.log(
              "🚀 ~ file: VacationTabs.vue:84 ~ returnthis.vacations.filter ~ vacationEnd:",
              vacationEnd
            );
            return isWithinInterval(today, {
              start: vacationStart,
              end: vacationEnd,
            });
          })
        : [];
    },
    pastVacations(): Vacation[] {
      return this.vacations.filter((vacation: Vacation) =>
        isBefore(new Date(vacation.endDate as string), this.getYesterday())
      );
    },
    getYesterday(): Date {
      const today: Date = new Date();
      return add(today, {
        hours: -today.getHours(),
        minutes: -today.getMinutes(),
        seconds: -today.getSeconds() - 1,
      });
    },
    getTomorrow(): Date {
      const today: Date = new Date();
      return add(today, {
        hours: 27 - today.getHours(),
        minutes: -today.getMinutes(),
        seconds: -today.getSeconds(),
      });
    },
  },
};
</script>
