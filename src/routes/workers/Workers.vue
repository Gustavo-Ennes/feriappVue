<template>
  <div class="container">
    <div class="row justify-content-center align-items-baseline">
      <div class="col-12">
        <WorkerSearch
          class="py-4"
          @searchTermUpdated="updateWorkers"
          @selectWorker="handleSelectWorker"
          @openModal="handleOpenModal"
        />
      </div>
      <div class="col-12">
        <WorkerTable
          :workers="filteredWorkers"
          class="py-4"
          v-if="workers?.length"
          @selectWorker="handleSelectWorker"
          @openModal="handleOpenModal"
          :openConfirmationModal="() => confirmationModal?.show()"
        />
        <h3 v-else class="label">Não há trabalhadores para o termo buscado.</h3>
      </div>
    </div>
  </div>
  <WorkerModal
    :type="modalType"
    :modal="modal"
    :worker="selectedWorker"
    @form-submitted="getAllWorkers"
  />
  <DrasticConfirmationModal
    _id="workerConfirmationModal"
    text="Observe que ao deletar o trabalhador, todas as suas férias serão deletadas permanentemente."
    confirm-drastic-action-button-label="Deletar assim mesmo"
    :hide-callback="handleDeleteModalHide"
    :confirmation-callback="handleDeleteWorker"
  />
</template>

<script lang="ts">
import { Modal } from "bootstrap";

import DrasticConfirmationModal from "../../components/DrasticConfirmationModal.vue";
import WorkerTable from "./components/WorkerTable/WorkerTable.vue";
import WorkerSearch from "./components/WorkerSearch/WorkerSearch.vue";
import WorkerModal from "../../components/WorkerModal/WorkerModal.vue";
import { deleteWorker, getWorkers } from "./fetch";
import type { WorkerResponseInterface, WorkersDataInterface } from "./types";

export default {
  name: "Workers",
  async beforeMount(): Promise<void> {
    await this.getAllWorkers();
  },
  mounted() {
    this.instantiateModal();
  },
  data(): WorkersDataInterface {
    return {
      filteredWorkers: undefined,
      workers: undefined,
      modal: undefined,
      modalType: "",
      selectedWorker: undefined,
      departments: undefined,
      confirmationModal: undefined
    };
  },
  methods: {
    async handleDeleteWorker(): Promise<void> {
      if (this.selectedWorker?._id) {
        await deleteWorker(this.selectedWorker._id);
        await this.getAllWorkers();
      }
    },
    async getAllWorkers(): Promise<void> {
      const { data }: WorkerResponseInterface = await getWorkers();
      if (data?.workers) {
        this.workers = data.workers;
        this.filteredWorkers = this.workers;
      }
    },
    handleSelectWorker(worker: any) {
      this.selectedWorker = worker;
    },
    handleOpenModal(type: string): void {
      if (type === "create") this.selectedWorker = undefined;
      this.modalType = type;
      this.modal?.show();
    },
    instantiateModal(): void {
      const modalHTML = document.getElementById(`worker-modal`);
      const confirmationModalHTML = document.getElementById(
        "workerConfirmationModal"
      );
      this.modal = new Modal(modalHTML as HTMLElement, {});
      this.confirmationModal = new Modal(
        confirmationModalHTML as HTMLElement,
        {}
      );
    },
    async handleWorkerCreated(): Promise<void> {
      await this.getAllWorkers();
    },
    updateWorkers(searchTerm: string): void {
      this.filteredWorkers =
        this.workers?.filter(
          ({ name, matriculation, registry }) =>
            name.includes(searchTerm) ||
            matriculation.includes(searchTerm) ||
            registry.includes(searchTerm)
        ) ?? [];
    },
    handleDeleteModalHide() {
      this.selectedWorker = undefined;
      this.confirmationModal?.hide();
    }
  },
  components: {
    WorkerTable,
    WorkerSearch,
    WorkerModal,
    DrasticConfirmationModal
  }
};
</script>

<style lang="scss" scoped>
.label {
  margin-top: 40px;
  margin-left: 15px;
}
</style>
