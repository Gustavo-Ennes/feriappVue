<template>
  <div class="container my-3 text-center">
    <div class="row justify-content-center g-2">
      <h1 class="col-4 offset-4 pt-4 text-center">Setores</h1>
      <div class="col pt-4 text-center">
        <button
          class="btn btn-sm btn-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title="`Você criará um setor`"
          @click="() => handleOpenModal('create')"
        >
          <i class="fa-solid fa-plus" />
          setor
        </button>
      </div>
    </div>
    <div class="row justify-content-center g-2">
      <div
        v-for="department in departments"
        :key="department._id"
        class="col-12 col-md-6 col-lg-4 col-xl-2"
      >
        <DepartmentCard
          :department="department"
          :handle-open-modal="handleOpenModal"
          @set-department="handleSetDepartment"
          :handle-confirmation-modal="() => handleConfirmationModal(department)"
        />
      </div>
    </div>
  </div>
  <DepartmentModal
    :modal="modal"
    :type="modalType"
    :department="department"
    @form-submitted="getAllDepartments"
  />
  <DrasticConfirmationModal
    _id="departmentConfirmationModal"
    @hide="confirmationModal?.hide()"
    :confirmationCallback="() => handleDeleteDepartment(department?._id as string)"
    text="Observe que ao deletar o setor, todos os trabalhadores não serão deletados e ficarão sem setor."
    confirm-drastic-action-button-label="Deletar assim mesmo"
  />
</template>

<script lang="ts">
import DrasticConfirmationModal from "@/components/DrasticConfirmationModal.vue";
import { deleteDepartment, getDepartments } from "./fetch";
import type {
  DepartmentsDataInterface,
  DepartmentFetchResponse,
  Department,
} from "./types";
import DepartmentCard from "./components/DepartmentCard.vue";
import DepartmentModal from "./components/DepartmentModal/DepartmentModal.vue";
import { Modal } from "bootstrap";

export default {
  name: "Departments",
  async beforeMount(): Promise<void> {
    await this.getAllDepartments();
    this.instantiateModal();
  },
  methods: {
    handleOpenModal(type: "create" | "update"): void {
      this.modalType = type;
      this.department = type === "create" ? undefined : this.department;
      this.modal?.show();
    },
    async getAllDepartments(): Promise<void> {
      const { data }: DepartmentFetchResponse = await getDepartments();
      this.departments = data?.departments;
    },
    instantiateModal(): void {
      const modalHtml = document.getElementById("departmentModal");
      const modalConfirmationHtml = document.getElementById(
        "departmentConfirmationModal"
      );
      const modal = new Modal(modalHtml as HTMLElement);
      const confirmationModal = new Modal(modalConfirmationHtml as HTMLElement);
      this.modal = modal;
      this.confirmationModal = confirmationModal;
    },
    handleSetDepartment(department: Department) {
      this.department = department;
    },
    handleConfirmationModal(department: Department) {
      this.department = department;
      this.confirmationModal?.show();
    },
    async handleDeleteDepartment(_id: string): Promise<void> {
      await deleteDepartment(_id);
      await this.getAllDepartments();
    },
  },
  data(): DepartmentsDataInterface {
    return {
      departments: undefined,
      department: undefined,
      modal: undefined,
      modalType: undefined,
      confirmationModal: undefined,
    };
  },
  components: { DepartmentCard, DepartmentModal, DrasticConfirmationModal },
};
</script>
