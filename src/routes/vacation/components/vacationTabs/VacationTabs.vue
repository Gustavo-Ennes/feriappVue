<template>
  <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
    <VacationTabHeader type="future" :active="true" />
    <VacationTabHeader type="present" />
    <VacationTabHeader type="past" />
  </ul>

  <div class="tab-content">
    <VacationTabBody
      type="future"
      :vacations="futureVacations"
      :active="true"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="present"
      :vacations="presentVacations"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="past"
      :vacations="pastVacations"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
  </div>
</template>

<script lang="ts">
import VacationTabHeader from "./VacationTabHeader.vue";
import VacationTabBody from "./VacationTabBody.vue";
import { isAfter, isSameDay, isBefore, set, add, sub, format } from "date-fns";
import type { Vacation } from "../../types";

export default {
  name: "VacationTabs",
  props: ["vacations"],
  emits: ["selectVacation", "openModal", "deleteVacation"],
  components: { VacationTabHeader, VacationTabBody },
  methods: {
    handleEdit(vacation: Vacation) {
      this.$emit("selectVacation", vacation);
      this.$emit("openModal", "edit");
    },
    handleDelete(vacation: Vacation) {
      this.$emit("selectVacation", vacation);
      this.$emit("deleteVacation", vacation._id);
    },
    yesterday(vacation: Vacation) {
      const startDate = new Date(vacation.startDate);
      const yesterdayDate = sub(new Date(), {
        hours: startDate.getHours(),
        minutes: startDate.getMinutes(),
        seconds: startDate.getSeconds(),
      });
      return yesterdayDate;
    },
    tomorrow(vacation: Vacation) {
      const startDate = new Date(vacation.startDate);
      return add(new Date(), {
        hours: 23 - startDate.getHours(),
        minutes: 59 - startDate.getMinutes(),
        seconds: 59 - startDate.getSeconds(),
      });
    },
  },
  computed: {
    futureVacations() {
      return this.vacations.filter((vacation: Vacation) => {
        const vacationDate = new Date(vacation.startDate);
        const tomorrow = this.tomorrow(vacation);
        return isAfter(new Date(vacation.startDate), this.tomorrow(vacation));
      });
    },
    presentVacations() {
      return this.vacations.filter((vacation: Vacation) =>
        isSameDay(new Date(vacation.startDate), new Date())
      );
    },
    pastVacations() {
      return this.vacations.filter((vacation: Vacation) =>
        isBefore(new Date(vacation.startDate), this.yesterday(vacation))
      );
    },
  },
};
</script>
