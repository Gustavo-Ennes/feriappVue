<template>
  <div class="container my-3">
    <div class="row g-2 align-items-center">
      <div class="col-2" />
      <div class="col-8 text-center">
        <h1>Horas Extras</h1>
        <p>
          Referência
          {{ formatedRef ?? "Defina uma referência na lista abaixo" }}
        </p>
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
            :departments="departments"
            @add-to-modified="handleCalendarModification"
            @clean-modified="resetExtraHour"
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
import { format, getDaysInMonth } from "date-fns";

import Calendar from "./components/calendar/Calendar.vue";
import SelectSection from "./components/SelectSection.vue";
import {
  _fetchReferences,
  _fetchExtraHours,
  _findExtraHour,
  _getUpdatedExtraHour,
  _handleCalendarModification,
  _preProcessExtraHours,
  _handleSaveExtraHours,
} from "./extraHourTable";
import type {
  ExtraHourTableParam,
  ExtraHourData,
  ExtraHourWorker,
  ExtraHourInput,
  ExtraHourProcessData,
} from "./types";

export default {
  name: "ExtraHoursTable",
  data(): ExtraHourData {
    return {
      extraHours: [],
      modified: [],
      created: [],
      workers: [],
      selectedWorker: undefined,
      reference: undefined,
      references: [],
      hasModifications: false,
      departments: [],
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
      await _fetchReferences(this);
    },
    async fetchExtraHours() {
      await _fetchExtraHours(this);
    },
    findExtraHour(extraHourTableParam: ExtraHourTableParam) {
      return _findExtraHour(this, extraHourTableParam);
    },
    handleUpdateWorker(worker: ExtraHourWorker) {
      this.selectedWorker = worker;
    },
    getUpdatedExtraHour(extraHour: ExtraHourInput) {
      return _getUpdatedExtraHour(this, extraHour);
    },
    handleCalendarModification(extraHour: ExtraHourInput) {
      _handleCalendarModification(this, extraHour);
    },
    async handleUpdateReference(reference: Date) {
      this.reference = reference;
      this.resetExtraHour;
    },
    async resetExtraHour() {
      this.modified = [];
      this.created = [];
      this.hasModifications = false;
      await this.fetchExtraHours();
    },
    preProcessExtraHours(): ExtraHourProcessData[] {
      return _preProcessExtraHours(this);
    },
    async handleSaveExtraHours() {
      await _handleSaveExtraHours(this);
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
