<template>
  <div class="container text-center my-5">
    <div class="row justify-content-start align-items-center g-2">
      <h1 class="col-12">{{ capitalizeName(worker?.name ?? "") }}</h1>
      <h6 class="col-12 mb-5">Cargo: {{ worker?.role }}</h6>
      <div class="col-12 col-sm-6">
        <p>Registro: {{ worker?.registry }}</p>
      </div>
      <div class="col-12 col-sm-6">
        <p>Matrícula: {{ worker?.matriculation }}</p>
      </div>
      <div class="col-12 col-sm-6">
        <p>Data de admissão: {{ computedAdmissionDate }}</p>
      </div>
      <div class="col-12 col-sm-6">
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
    </div>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import type { Worker } from "../workers/types";
import { getWorkerById } from "./fetch";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "Worker",
  props: ["_id"],
  data(): { worker?: Worker } {
    return {
      worker: undefined,
    };
  },
  async beforeMount(): Promise<void> {
    const { data } = await getWorkerById({ _id: this._id });
    this.worker = data.worker;
  },
  computed: {
    computedAdmissionDate(): string {
      return this.worker?.admissionDate
        ? format(new Date(this.worker.admissionDate), "dd/MM/yyyy")
        : "";
    },
  },
  methods: { capitalizeName },
};
</script>
