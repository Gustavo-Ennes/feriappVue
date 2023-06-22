<template>
  <div class="row justify-content-center align-items-center text-center">
    <div class="col-6">
      <h5><i class="fa-regular fa-sun h3 text-warning mx-2" />Diurnas</h5>
      <span class="badge rounded-pill bg-primary"
        ><div class="h5 m-1 p-1">{{ workerHoursSum }}</div></span
      >
    </div>
    <div class="col-6">
      <h5><i class="fa-regular fa-moon h3 text-primary mx-2" />Noturnas</h5>
      <span class="badge rounded-pill bg-primary"
        ><div class="h5 m-1 p-1">{{ workerNightlyHoursSum }}</div></span
      >
    </div>
    <div class="col-12" v-if="extractedDepartments.length">
      <div class="p-3">
        <h5>Secretarias atendidas</h5>
        <div class="row justify-content-center">
          <div
            class="col"
            v-for="extractedDepartment in extractedDepartments"
            :key="extractedDepartment._id"
          >
            <div :class="`py-2 badge rounded-pill bg-${worker.department._id === extractedDepartment._id?.toString() ? 'primary' : 'secondary'}`">
              {{ extractedDepartment.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Department } from "@/routes/departments/types";

export default {
  name: "CalendarInfo",
  props: {
    workerHoursSum: {
      type: Number,
      default: 0,
    },
    workerNightlyHoursSum: {
      type: Number,
      default: 0,
    },
    extractedDepartments: {
      type: Array<Department>,
      default: [],
    },
    worker: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
p .badge {
  font-size: 20px !important;
}
</style>
