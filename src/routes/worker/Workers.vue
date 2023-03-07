<template>
  <div class="container">
    <div class="row justify-content-center align-items-baseline">
      <div class="col-12">
        <WorkerForm
          class="py-4"
          @searchTermUpdated="updateWorkers"
          @selectWorker="handleSelectWorker"
          @openModal="handleOpenModal"
        />
      </div>
      <div class="col-12">
        <WorkerTable
          :workers="displayWorkers"
          :departments="departments"
          class="py-4"
          v-if="displayWorkers?.length"
          @selectWorker="handleSelectWorker"
          @openModal="handleOpenModal"
        />
        <h3 v-else class="label">Não há trabalhadores para o termo buscado.</h3>
      </div>
    </div>
  </div>
  <WorkerModal
    :type="modalType"
    :modal="modal"
    :worker="selectedWorker"
    @worker-created="getAllWorkers"
  />
</template>

<script lang="ts">
import { Modal } from "bootstrap";

import WorkerTable from "./components/WorkerTable/WorkerTable.vue";
import WorkerForm from "./components/WorkerForm/WorkerForm.vue";
import WorkerModal from "./components/WorkerModal/WorkerModal.vue";
import { getWorkers, getDepartments } from "./fetch";
import type {
  DepartmentResponseInterface,
  WorkerResponseInterface,
  WorkersDataInterface,
} from "./types";

export default {
  name: "Workers",
  async beforeMount(): Promise<void> {
    await this.getAllWorkers();
    await this.getAllDepartments();
  },
  mounted() {
    this.instantiateModal();
  },
  data(): WorkersDataInterface {
    return {
      allWorkers: null,
      displayWorkers: null,
      modal: undefined,
      modalType: "",
      selectedWorker: undefined,
      departments: undefined,
    };
  },
  methods: {
    async getAllDepartments(): Promise<void> {
      const { data }: DepartmentResponseInterface = await getDepartments();
      if (data?.departments) {
        this.departments = data.departments;
      }
    },
    async getAllWorkers(): Promise<void> {
      const { data }: WorkerResponseInterface = await getWorkers();
      if (data?.workers) {
        this.allWorkers = data.workers;
        this.displayWorkers = this.allWorkers;
      }
    },
    handleSelectWorker(worker: any) {
      this.selectedWorker = worker;
    },
    handleOpenModal(type: string): void {
      this.modalType = type;
      this.modal?.show();
    },
    instantiateModal(): void {
      const modalHTML = document.getElementById("exampleModal");
      this.modal = new Modal(modalHTML as HTMLElement, {});
    },
    async handleWorkerCreated(): Promise<void> {
      await this.getAllWorkers();
    },
    updateWorkers(searchTerm: string): void {
      this.displayWorkers =
        this.allWorkers?.filter(
          ({ name, matriculation, registry }) =>
            name.includes(searchTerm) ||
            matriculation.includes(searchTerm) ||
            registry.includes(searchTerm)
        ) ?? null;
    },
  },
  components: { WorkerTable, WorkerForm, WorkerModal },
};
</script>

<style lang="scss">
.label {
  margin-top: 40px;
  margin-left: 15px;
}
</style>
