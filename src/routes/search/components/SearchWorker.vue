<template>
  <div class="row justify-content-center g-2">
    <div class="col-12">
      <h4>Trabalhadores</h4>
    </div>
    <div class="col-12">
      <ol class="list-group list-group-numbered">
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
          v-for="worker in workers"
          :key="worker._id"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ capitalizeName(worker.name) }}</div>
            <small>{{ capitalizeName(worker.department.name) }}</small>
          </div>
          <span
            class="badge bg-primary rounded-pill"
            @click="handlePush(worker)"
          >
            <i class="fa-solid fa-magnifying-glass" />
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { capitalizeName } from "@/routes/utils";
import type { Worker } from "@/routes/workers/types";

export default {
  name: "SearchWorker",
  props: ["workers"],
  methods: {
    capitalizeName,
    handlePush(worker: Worker) {
      this.$router.push({ name: "worker", params: { _id: worker._id } });
    },
  },
};
</script>
