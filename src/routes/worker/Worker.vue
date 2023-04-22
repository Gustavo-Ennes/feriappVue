<template>
  <div class="container text-center my-5">
    <div class="row justify-content-start align-items-center g-2">
      <h1 class="col-12 text-primary">
        {{ capitalizeName(worker?.name ?? "") }}
      </h1>
      <h6 class="col-12 mb-5 text-info">Cargo: {{ worker?.role }}</h6>
      <div class="col-12 col-sm-6">
        <i class="fa-solid fa-address-card text-primary" />
        <p>Registro: {{ worker?.registry }}</p>
      </div>
      <div class="col-12 col-sm-6">
        <i class="fa-solid fa-id-card text-primary" />
        <p>Matrícula: {{ worker?.matriculation }}</p>
      </div>
      <div class="col-12 col-sm-6">
        <i class="fa-solid fa-calendar text-primary" />
        <p>Data de admissão: {{ computedAdmissionDate }}</p>
      </div>
      <div class="col-12 col-sm-6">
        <i class="fa-solid fa-building-user text-primary" />
        <p>
          <router-link
            to="/departments"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Visitar o departamento de ${capitalizeName(
              worker?.department.name ?? ''
            )}`"
            >Departamento:
            {{ capitalizeName(worker?.department.name ?? "") }}</router-link
          >
        </p>
      </div>
      <div class="col-12">
        <div class="mt-5"><WorkerVacations :vacations="workerVacations" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";

import WorkerVacations from "./components/workerVacations/WorkerVacations.vue";
import type { WorkerDataType } from "./types";
import { workerAndVacations } from "./fetch";
import { getVacations } from "./utils";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "Worker",
  props: ["_id"],
  data(): WorkerDataType {
    return {
      worker: undefined,
      workerVacations: undefined,
    };
  },
  async beforeMount(): Promise<void> {
    const { data } = await workerAndVacations({ _id: this._id });
    this.worker = data.worker;
    this.workerVacations = data.vacations;
  },
  computed: {
    computedAdmissionDate(): string {
      return this.worker?.admissionDate
        ? format(new Date(this.worker.admissionDate), "dd/MM/yyyy")
        : "";
    },
  },
  methods: {
    capitalizeName,
    getVacations,
  },
  components: { WorkerVacations },
};
</script>
