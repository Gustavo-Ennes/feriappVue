<template>
  <div class="container my-3">
    <div class="row g-2 align-items-center">
      <div class="col-2" />
      <div class="col-8 text-center">
        <h1>Horas Extras</h1>
        <p v-if="reference">Referência {{ formatedRef }}</p>
      </div>
      <div class="col-2 text-center">
        <button
          v-if="hasModifications"
          class="btn btn-primary"
          @click="handleSaveExtraHours"
        >
          Salvar Modificações
        </button>
      </div>
      <div class="col-12 text-center">
        <WorkerSelect
          :workers="workers"
          @update-selected-worker="handleUpdateWorker"
        />
      </div>
      <div v-if="reference && selectedWorker" class="col-12">
        <div class="my-5">
          <Calendar
            :reference="reference"
            :extra-hours="extraHours"
            :worker="selectedWorker"
            @add-to-modified="handleCalendarModification"
          />
        </div>
      </div>
      <div v-else class="col-12 text-center">
        <h5 class="my-5">
          Selecione um trabalhador na lista para mostrar o calendário
        </h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format, getDaysInMonth, isSameDay, set } from "date-fns";

import Calendar from "./components/calendar/Calendar.vue";
import WorkerSelect from "./components/WorkerSelect.vue";
import {
  createExtraHour,
  getExtraHoursWithRange,
  updateExtraHour,
} from "./fetch";
import type {
  ExtraHourTableParam,
  ExtraHourFetch,
  ExtraHourData,
  ExtraHour,
  ExtraHourWorker,
  ExtraHourInput,
} from "./types";
import { getReference } from "./utils";

export default {
  name: "ExtraHoursTable",
  data(): ExtraHourData {
    return {
      extraHours: [],
      modified: [],
      workers: [],
      selectedWorker: undefined,
      reference: undefined,
      hasModifications: false,
    };
  },
  computed: {
    modificationButtonLabel() {
      return "editar";
    },
    stringifiedRef() {
      if (this.reference) return format(this.reference, "MM/yyyy");
    },
    daysInMonth() {
      if (this.reference) return getDaysInMonth(this.reference);
    },
    formatedRef() {
      return this.reference ? format(this.reference, "MM/yyyy") : "";
    },
  },
  async beforeMount() {
    await this.fetchExtraHours();
  },
  methods: {
    async fetchExtraHours() {
      this.reference = getReference();
      const { data }: ExtraHourFetch = await getExtraHoursWithRange(
        this.reference
      );
      if (data?.extraHours && data?.workers) {
        this.extraHours = data.extraHours;
        this.workers = data.workers;
      }
    },
    findExtraHour({ worker: _worker, day }: ExtraHourTableParam) {
      return this.extraHours.filter(({ worker, reference }: ExtraHour) => {
        return (
          worker._id === _worker._id &&
          isSameDay(set(reference, { date: day }), reference)
        );
      })?.[0];
    },
    handleAddToModified(extraHour?: ExtraHourInput) {
      if (extraHour) this.modified.push(extraHour);
    },
    handleUpdateWorker(worker: ExtraHourWorker) {
      this.selectedWorker = worker;
    },
    handleCalendarModification(extraHour: ExtraHourInput) {
      this.hasModifications = true;
      this.modified.push(extraHour);
    },
    async handleSaveExtraHours() {
      if (this.modified.length) {
        this.modified.forEach(async (payload: ExtraHourInput) => {
          if (payload._id) {
            await updateExtraHour(payload);
          } else {
            await createExtraHour(payload);
          }
        });
        this.modified = [];
        this.hasModifications = false;
        await this.fetchExtraHours();
      }
    },
  },
  components: { Calendar, WorkerSelect },
};
</script>

<style>
td {
  min-width: 100px;
}
.no-spinners::-webkit-inner-spin-button,
.no-spinners::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinners {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
