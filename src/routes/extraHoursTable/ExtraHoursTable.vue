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
          class="btn btn-primary btn"
          @click="handleSaveExtraHours"
        >
          <p class="pt-2">
            <i class="fa-regular fa-floppy-disk h3 text-warning mr-2" /> Salvar
            Modificações
          </p>
        </button>
      </div>
      <div class="col-12 text-center">
        <SelectSection
          :workers="workers"
          :references="references"
          @update-selected-worker="handleUpdateWorker"
          @update-reference="handleUpdateReference"
        />
      </div>
      <div v-if="reference && selectedWorker" class="col-12">
        <div class="my-5">
          <Calendar
            :reference="reference"
            :extra-hours="extraHours"
            :worker="selectedWorker"
            :modified-qtd="modifiedQtd"
            @add-to-modified="handleCalendarModification"
            @clean-modified="handleCleanModified"
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
import { format, getDaysInMonth, isSameDay, parse, set } from "date-fns";

import Calendar from "./components/calendar/Calendar.vue";
import SelectSection from "./components/SelectSection.vue";
import {
  createExtraHour,
  getExtraHoursWithRange,
  updateExtraHour,
  extraHoursReferences,
} from "./fetch";
import type {
  ExtraHourTableParam,
  ExtraHourFetch,
  ExtraHourData,
  ExtraHour,
  ExtraHourWorker,
  ExtraHourInput,
} from "./types";
import { pluck, prop, uniq, uniqBy } from "ramda";

export default {
  name: "ExtraHoursTable",
  data(): ExtraHourData {
    return {
      extraHours: [],
      modified: [],
      workers: [],
      selectedWorker: undefined,
      reference: undefined,
      references: [],
      hasModifications: false,
    };
  },
  computed: {
    modifiedQtd() {
      return this.modified.length;
    },
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
    await this.fetchReferences();
  },
  methods: {
    async fetchReferences() {
      const { data }: ExtraHourFetch = await extraHoursReferences();
      if (data?.extraHours) {
        const pluckedRefs = pluck("reference", data.extraHours);
        const monthYearRef = pluckedRefs.map((value) =>
          format(new Date(value), "MM/yyyy")
        );
        monthYearRef.push(format(new Date(), "MM/yyyy"));
        const uniqueRefs = uniq(monthYearRef);
        this.references = uniqueRefs.map((ref) =>
          parse(ref, "MM/yyyy", new Date())
        );
      }
    },
    async fetchExtraHours() {
      if (this.reference) {
        const { data }: ExtraHourFetch = await getExtraHoursWithRange(
          this.reference
        );
        if (data?.extraHours && data?.workers) {
          this.extraHours = data.extraHours.sort(
            (
              { worker: { name: __name } }: ExtraHour,
              { worker: { name: _name } }: ExtraHour
            ) => (_name < __name ? 1 : -1)
          );
          this.workers = data.workers;
        }
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
    handleUpdateWorker(worker: ExtraHourWorker) {
      this.selectedWorker = worker;
    },
    handleCalendarModification(extraHour: ExtraHourInput) {
      if (extraHour) {
        this.hasModifications = true;
        this.modified = uniqBy(prop("_id"), [...this.modified, extraHour]);
      }
    },
    handleCleanModified() {
      this.modified.splice(0, this.modified.length);
      this.hasModifications = false;
    },
    async handleUpdateReference(reference: Date) {
      this.reference = reference;
      await this.resetExtraHour;
    },
    async resetExtraHour() {
      this.modified = [];
      this.hasModifications = false;
      await this.fetchExtraHours();
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
        await this.resetExtraHour();
      }
    },
  },
  components: { Calendar, SelectSection },
  watch: {
    reference: {
      async handler() {
        await this.fetchExtraHours();
      },
      deep: true,
    },
  },
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
