<template>
  <div class="container text-center my-5">
    <div class="row justify-content-start align-items-center g-2">
      <div class="col-3" />
      <h1 class="col-6 text-primary">
        {{ capitalizeName(worker?.name ?? "nome") }}
      </h1>
      <div class="col-3">
        <button class="btn btn-primary" @click="handleOpenModal">
          <i class="text-warning fa-solid fa-pen" /> Editar
        </button>
      </div>
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
              worker?.department.name ?? 'nome'
            )}`"
            >Departamento:
            {{ capitalizeName(worker?.department.name ?? "nome") }}</router-link
          >
        </p>
      </div>
      <div class="col-12 col-sm-6">
        <i class="fa-solid fa-dollar text-primary" />
        <p>Justificativa de H.E.: {{ computedJustification }}</p>
      </div>
      <div class="col-12">
        <div class="mt-5"><WorkerVacations :vacations="workerVacations" /></div>
      </div>
    </div>
  </div>
  <WorkerModal
    type="edit"
    :modal="modal"
    :worker="worker"
    @form-submitted="getWorkerAndVacations"
  />
</template>

<script lang="ts">
import { format } from "date-fns";
import { Modal } from "bootstrap";

import WorkerVacations from "./components/workerVacations/WorkerVacations.vue";
import DrasticConfirmationModal from "../../components/DrasticConfirmationModal.vue";
import type { WorkerDataType } from "./types";
import { workerAndVacations } from "./fetch";
import WorkerModal from "../../components/WorkerModal/WorkerModal.vue";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "Worker",
  props: ["_id"],
  emits: ["selectWorker", "openModal"],
  data(): WorkerDataType {
    return {
      worker: undefined,
      workerVacations: undefined,
      modal: undefined
    };
  },
  async beforeMount(): Promise<void> {
    await this.getWorkerAndVacations();
  },
  mounted() {
    this.instantiateModal();
  },
  computed: {
    computedJustification() {
      return this.worker?.justification;
    },
    computedAdmissionDate(): string {
      return this.worker?.admissionDate
        ? format(new Date(this.worker.admissionDate), "dd/MM/yyyy")
        : "";
    }
  },
  methods: {
    capitalizeName,
    handleOpenModal() {
      this.modal?.show();
    },
    async getWorkerAndVacations() {
      const { data } = await workerAndVacations({ _id: this._id });
      this.worker = data.worker;
      this.workerVacations = data.vacations;
    },
    instantiateModal(): void {
      const modalHTML = document.getElementById(`worker-modal`);
      this.modal = new Modal(modalHTML as HTMLElement, {});
    }
  },
  components: { WorkerVacations, WorkerModal, DrasticConfirmationModal }
};
</script>
