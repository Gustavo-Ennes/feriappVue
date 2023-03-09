<template>
  <div class="container">
    <div class="row gap-2 justify-content-center">
      <h1 class="col pt-4 text-center">{{ computedTitle }}</h1>
      <div class="col-12">
        <VacationTabs :vacations="computedVacations" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { VacationDataInterface, VacationFetchInterface } from "./types";
import VacationTabs from "./components/VacationTabs.vue";
// import { getVacations } from "./fetch";
import { add } from "date-fns";

const vacationsFake = [
  {
    _id: "aopjsasd1043213",
    daysQtd: 1,
    startDate: new Date().toISOString(),
    workerId: "6407332e99beee36c3e51ea0",
    type: "dayOff",
  },
  {
    _id: "aopjsasd1043214",
    daysQtd: 1,
    startDate: add(new Date(), { days: 2 }).toISOString(),
    workerId: "6407332e99beee36c3e51ea0",
    type: "dayOff",
  },
  {
    _id: "14qasd1335tw",
    daysQtd: 1,
    startDate: add(new Date(), { days: -10 }).toISOString(),
    workerId: "6407336999beee36c3e51ea7",
    type: "dayOff",
  },
];

export default {
  name: "Vacation",
  props: ["type"],
  data(): VacationDataInterface {
    return {
      vacations: vacationsFake,
    };
  },
  computed: {
    computedTitle() {
      return this.type === "dayOff"
        ? "Abono"
        : this.type === "vacation"
        ? "Férias"
        : "Licença-Prêmio";
    },
    computedVacations() {
      return this.$data.vacations?.filter(
        (vacation) => vacation.type === this.type
      );
    },
  },
  // async beforeMount(): Promise<void> {
  //   const { data }: VacationFetchInterface = await getVacations();
  //   this.vacations = data.vacations;
  //   console.log(
  //     "🚀 ~ file: Vacation.vue:18 ~ beforeMount ~ this.vacations:",
  //     this.vacations
  //   );
  // },
  components:{
    VacationTabs
  }
};
</script>
