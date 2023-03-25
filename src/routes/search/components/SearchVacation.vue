<template>
  <div class="row justify-content-center g-2">
    <div class="col-12">
      <h4>Folgas</h4>
    </div>
    <div class="col-12">
      <ol class="list-group list-group-numbered">
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
          v-for="vacation in vacations"
          :key="vacation._id"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ startDate(vacation) }}</div>
            <small>{{ vacation.worker.name }}</small>
          </div>
          <span
            class="badge bg-primary rounded-pill"
            @click="handlePush(vacation)"
          >
            <i class="fa-solid fa-magnifying-glass" />
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import type { Vacation } from "@/routes/vacation/types";
import { format } from "date-fns";

export default {
  name: "SearchVacation",
  props: ["vacations"],
  methods: {
    startDate(vacation: Vacation) {
      return format(new Date(vacation.startDate), "dd/MM/yyyy");
    },
    handlePush(vacation: Vacation) {
      this.$router.push(`/${vacation.type}`);
    },
  },
};
</script>
