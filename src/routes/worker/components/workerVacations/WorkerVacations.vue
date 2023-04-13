<template>
  <div class="row justify-content-center align-items-start g-2">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <WorkerVacationsSection :vacations="realVacations" v-if="realVacations.length" type="vacation" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <WorkerVacationsSection :vacations="licenses" v-if="licenses.length" type="license" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <WorkerVacationsSection :vacations="dayOffs" v-if="dayOffs.length" type="dayOff" />
    </div>
  </div>
</template>

<script lang="ts">
import WorkerVacationsSection from "./components/WorkerVacationsSection.vue";
import { getVacations, getLicenses, getDayOffs } from "../../utils";
export default {
  name: "WorkerVacations",
  props: ["vacations"],
  components: { WorkerVacationsSection },
  computed: {
    realVacations() {
      return getVacations(this.vacations);
    },
    licenses() {
      return getLicenses(this.vacations);
    },
    dayOffs() {
      return getDayOffs(this.vacations);
    },
  },
};
</script>
