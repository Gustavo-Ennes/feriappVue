<template>
  <div class="container my-3 text-center">
    <div class="row g-2 justify-content-center">
      <h1 class="col-4 offset-4 pt-4 text-center">{{ computedTitle }}</h1>
      <h1 class="col pt-4 text-center">
        <button
          class="btn btn-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title="`Você criará um(a) ${computedTitle.toLowerCase()}`"
          @click="handleOpenModal('create')"
        >
          <i class="fa-solid fa-plus" /> {{ computedButtonLabel }}
        </button>
      </h1>
      <div class="col-12">
        <VacationTabs
          :title="computedButtonLabel"
          :vacation-type="type"
          :pagination="pagination"
          @deleteVacation="showConfirmationModal"
          @selectVacation="handleSelectVacation"
          @openModal="handleOpenModal"
          @page-changed="handlePageChanged"
        />
      </div>
    </div>
  </div>
  <VacationModal
    :type="type"
    :modalType="modalType"
    :vacation="vacation"
    :modal="modal"
    :title="computedTitle"
    @vacationChanged="handleVacationChanged"
  />
  <DrasticConfirmationModal
    @hide="() => confirmationModal?.hide()"
    :confirmationCallback="() => handleDelete(vacation?._id as string)"
    _id="vacationConfirmationModal"
  />
</template>

<script lang="ts">
import { Modal } from "bootstrap";

import DrasticConfirmationModal from "@/components/DrasticConfirmationModal.vue";
import type {
  Vacation,
  VacationDataInterface,
  VacationFetchInterface
} from "./types";
import VacationTabs from "./components/vacationTabs/VacationTabs.vue";
import { deleteVacation, getVacationsByType } from "./fetch";
import VacationModal from "./components/vacationModal/VacationModal.vue";

export default {
  name: "Vacation",
  props: ["type"],
  data(): VacationDataInterface {
    return {
      pagination: undefined,
      modal: undefined,
      modalType: undefined,
      vacation: undefined,
      workers: undefined,
      confirmationModal: undefined,
      page: 1
    };
  },
  watch: {
    async type(): Promise<void> {
      await this.getAllVacations();
    }
  },
  computed: {
    computedTitle() {
      return this.type === "dayOff"
        ? "Abono"
        : this.type === "vacation"
        ? "Férias"
        : "Licença Prêmio";
    },
    computedButtonLabel() {
      if (this.type === "dayOff") return "novo abono";
      else if (this.type === "vacation") return "novas férias";
      else if (this.type === "license") return "nova licença-prêmio";
    }
  },
  methods: {
    async getAllVacations(): Promise<void> {
      const { data }: VacationFetchInterface = await getVacationsByType(
        this.type,
        this.page
      );
      if (data?.vacations) {
        this.pagination = data.vacations;
      }
    },
    async handlePageChanged(page: number): Promise<void> {
      this.page = page;
      await this.getAllVacations();
    },
    handleSelectVacation(vacation: Vacation) {
      this.vacation = vacation;
    },
    showConfirmationModal() {
      if (!this.confirmationModal) {
        const modalHTML = document.getElementById("vacationConfirmationModal");
        this.confirmationModal = new Modal(modalHTML as HTMLElement);
      }
      this.confirmationModal.show();
    },
    handleOpenModal(type: string): void {
      this.modalType = type;
      if (type === "create") this.vacation = undefined;
      this.modal?.show();
    },
    instantiateModal(): void {
      const modalHTML = document.getElementById("vacationModal");
      this.modal = new Modal(modalHTML as HTMLElement, {});
    },
    async handleDelete(_id: string): Promise<void> {
      await deleteVacation(_id);
      await this.getAllVacations();
    },
    async handleVacationChanged(): Promise<void> {
      await this.getAllVacations();
    }
  },
  async beforeMount(): Promise<void> {
    await this.getAllVacations();
    this.instantiateModal();
  },
  components: {
    VacationTabs,
    VacationModal,
    DrasticConfirmationModal
  }
};
</script>
