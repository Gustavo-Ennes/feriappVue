<template>
  <div class="table-responsive text-center">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Função</th>
          <th scope="col">Status</th>
          <th scope="col">Data admissão</th>
          <th scope="col">Departamento</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="worker in workers">
          <td>{{ worker.name }}</td>
          <td>{{ worker.role }}</td>
          <td>{{ getTranslatedStatus(worker.status) }}</td>
          <td>{{ getAdmissionDate(worker) }}</td>
          <td>{{ worker?.department.name }}</td>
          <td>
            <i
              class="fa-solid fa-trash-can text-danger px-xs-1 px-2 px-md-4"
              @click="showConfirmationModal"
            ></i>
            <DeleteConfirmationModal
              :worker="worker"
              @hide="confirmationModal?.hide()"
              @deleteWorker="handleDeleteWorker"
            />
            <i
              class="fa-solid fa-pen text-warning"
              @click="handleEdit(worker)"
            ></i>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import { Modal } from "bootstrap";

import type { Worker, WorkerTableDataInterface, Department } from "../../types";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal.vue";
import { getTranslatedStatus } from "./components/status";

export default {
  name: "WorkerTable",
  props: ["workers", "departments"],
  data(): WorkerTableDataInterface {
    return {
      confirmationModal: undefined,
    };
  },
  methods: {
    getTranslatedStatus,
    handleDeleteWorker(worker: Worker) {
      this.workers.splice(this.workers.indexOf(worker), 1);
    },
    showConfirmationModal() {
      if (!this.confirmationModal) {
        const modalHTML = document.getElementById("deleteConfirmationModal");
        this.confirmationModal = new Modal(modalHTML as HTMLElement);
      }
      this.confirmationModal.show();
    },
    handleEdit(worker: Worker) {
      this.$emit("selectWorker", worker);
      this.$emit("openModal", "edit");
    },
    getAdmissionDate(worker: Worker) {
      return format(new Date(worker.admissionDate), "dd/MM/yyyy");
    },
  },
  components: { DeleteConfirmationModal },
};
</script>

<style lang="scss" scoped>
.btn-xs {
  width: 10px;
  text-align: center;
  font-size: 8px;
}
.fa-solid {
  cursor: pointer;
}
</style>
