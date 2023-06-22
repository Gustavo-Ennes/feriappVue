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
  mounted() {
    if (this.$store.state.calendarTemp?.worker) {
      this.worker = JSON.parse(this.$store.state.calendarTemp?.worker || "");
    }
    if (this.$store.state.calendarTemp?.reference) {
      this.reference = new Date(
        this.$store.state.calendarTemp?.reference as string
      );
    }
  },
  methods: {
    capitalizeName,
    formatReference(selectedReference: Date) {
      return format(selectedReference, "MM/yyyy");
    },
    saveCalendarSettings() {
      if (this.worker && this.reference) {
        const data = {
          worker: JSON.stringify(this.worker),
          reference: this.reference.toISOString(),
        };
        this.$store.dispatch("saveCalendar", data);
      }
    },
  },
  watch: {
    worker() {
      this.$emit("updateSelectedWorker", this.worker);
      this.saveCalendarSettings();
    },
    reference() {
      this.$emit("updateReference", this.reference);
      this.saveCalendarSettings();
    },
  },
};
</script>
