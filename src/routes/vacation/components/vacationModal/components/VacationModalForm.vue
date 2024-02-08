<template>
  <form
    @submit.prevent="submitForm(computedForm)"
    class="row justify-content-center align-items-center"
    id="vacationCreateForm"
  >
    <div class="col-xs-12 col-sm-8 my-2">
      <label class="form-label">{{
        type === "dayOff" ? "Selecione o período" : "Quantidade de dias"
      }}</label>
      <select
        class="form-select"
        aria-label="days select"
        v-model="form.daysQtd"
        required
      >
        <option selected :value="null">Selecione a quantidade de dias</option>
        <option
          v-for="{ daysQtd, label } in daysOptions"
          :key="`select-day-option-${daysQtd}`"
          :value="daysQtd"
        >
          {{ label }}
        </option>
      </select>
    </div>
    <div class="col-xs-12 col-sm-4 my-2">
      <label class="form-label">Início</label>
      <input
        class="form-control"
        type="date"
        v-model="form.startDate"
        placeholder="ex: 03/12/1990"
        required
      />
    </div>
    <div class="col-xs-12 col-sm- my-2">
      <label class="form-label">Trabalhador</label>
      <select
        class="form-select"
        aria-label="Worker select"
        v-model="form.worker"
        required
        v-if="workers"
      >
        <option selected :value="null">Selecione o trabalhador</option>
        <option v-for="worker in workers" :key="worker._id" :value="worker._id">
          {{ capitalizeName(worker.name) }}
        </option>
      </select>
      <p v-else>Não há trabalhadores. Você precisa criá-los primeiro.</p>
    </div>
  </form>
</template>

<script lang="ts">
import { format } from "date-fns";
import type { VacationModalFormDataInterface } from "../../../types";
import { capitalizeName } from "../../../../utils";
import { getDaysOptions, getVacationOptions } from "./options";

export default {
  name: "VacationModalForm",
  props: ["workers", "submitForm", "vacation", "type", "modalType"],
  emits: ["formUpdated"],
  data(): VacationModalFormDataInterface {
    return {
      form: {
        daysQtd: this.vacation?.daysQtd ?? null,
        worker: this.vacation?.worker._id ?? null,
        type: this.vacation?.type ?? this.type,
        startDate: this.vacation?.startDate ?? format(new Date(), "yyyy-MM-dd"),
        _id: undefined
      }
    };
  },
  methods: { capitalizeName },
  computed: {
    daysOptions() {
      return getDaysOptions(this.type);
    },
    vacationsOptions() {
      return getVacationOptions(this.type);
    },
    computedForm() {
      return this.form;
    }
  },
  watch: {
    form: {
      handler() {
        this.$emit("formUpdated", { ...this.form, type: this.type });
      },
      deep: true
    },
    vacation: {
      handler() {
        if (this.modalType === "edit") {
          const startDate = format(
            new Date(this.vacation?.startDate),
            "yyyy-MM-dd"
          );
          this.form = {
            daysQtd: this.vacation.daysQtd,
            startDate,
            worker: this.vacation.worker._id,
            type: this.vacation.type,
            _id: this.vacation._id
          };
        } else {
          this.form = {
            daysQtd: null,
            type: this.type,
            startDate: format(new Date(), "yyyy-MM-dd"),
            worker: null
          };
        }
      },
      deep: true
    }
  }
};
</script>

// TODO delete functionality and check all changes before commitl
