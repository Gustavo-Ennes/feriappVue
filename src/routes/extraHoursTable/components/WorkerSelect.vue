<template>
  <label class="form-label">Trabalhador</label>
  <select
    class="form-select"
    aria-label="Worker select"
    v-model="worker"
    required
  >
    <option selected :value="undefined">Selecione o trabalhador</option>
    <option
      v-for="selectedWorker in workers"
      :key="(selectedWorker as ExtraHourWorker)._id"
      :value="(selectedWorker as ExtraHourWorker)"
    >
      {{ capitalizeName((selectedWorker as ExtraHourWorker).name) }}
    </option>
  </select>
</template>

<script lang="ts">
import type { ExtraHoutWorkerSelectData, ExtraHourWorker } from "../types";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "ExtraHourWorkerSelect",
  emits: ["updateSelectedWorker"],
  props: {
    workers: {
      type: Array<ExtraHourWorker>,
      required: true,
    },
  },
  data(): ExtraHoutWorkerSelectData {
    return {
      worker: undefined,
    };
  },
  methods: { capitalizeName },
  watch: {
    worker() {
      this.$emit("updateSelectedWorker", this.worker);
    },
  },
};
</script>
