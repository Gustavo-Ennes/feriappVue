<template>
  <div class="row g-5 justify-content-center align-items-center">
    <div class="col-12 col-md-6">
      <label class="form-label">Referência</label>
      <select
        class="form-select"
        aria-label="Reference select"
        v-model="reference"
        required
      >
        <option selected :value="undefined">Selecione a referência</option>
        <option
          v-for="selectedReference in references"
          :key="`option-${selectedReference.toString()}`"
          :value="selectedReference"
        >
          {{ formatReference(selectedReference) }}
        </option>
      </select>
    </div>
    <div class="col-12 col-md-6">
      <label class="form-label">Trabalhador</label>
      <select
        class="form-select"
        aria-label="Worker select"
        v-model="worker"
        required
        :disabled="!reference"
      >
        <option selected :value="undefined">
          {{
            reference
              ? "Selecione o trabalhador"
              : "Selecione a referência ao lado primeiro"
          }}
        </option>
        <option
          v-for="selectedWorker in workers"
          :key="(selectedWorker as ExtraHourWorker)._id"
          :value="(selectedWorker as ExtraHourWorker)"
        >
          {{ capitalizeName((selectedWorker as ExtraHourWorker).name) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";

import type { ExtraHoutWorkerSelectData, ExtraHourWorker } from "../types";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "ExtraHourWorkerSelect",
  emits: ["updateSelectedWorker", "updateReference"],
  props: {
    workers: {
      type: Array<ExtraHourWorker>,
      required: true,
    },
    references: {
      type: Array<Date>,
      default: [],
    },
  },
  data(): ExtraHoutWorkerSelectData {
    return {
      worker: undefined,
      reference: undefined,
    };
  },
  methods: {
    capitalizeName,
    formatReference(selectedReference: Date) {
      console.log(
        "🚀 ~ file: WorkerSelect.vue:72 ~ methods:{capitalizeName,formatReference ~ selectedReference:",
        selectedReference
      );
      return format(selectedReference, "MM/yyyy");
    },
  },
  watch: {
    worker() {
      this.$emit("updateSelectedWorker", this.worker);
    },
    reference() {
      this.$emit("updateReference", this.reference);
    },
  },
};
</script>
