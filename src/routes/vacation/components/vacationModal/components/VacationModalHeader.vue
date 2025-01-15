<template>
  <h5 class="modal-title" id="vacationModalLabel">
    {{ computedTitle }}
  </h5>
  <i
    class="fa-regular fa-circle-xmark text-danger h4"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Fechar o modal"
    @click="computedModal?.hide"
  ></i>
</template>

<script lang="ts">
import { useVacationModals } from "@/routes/vacation/composables/modals";

export default {
  name: "VacationModalHeader",
  props: ["title", "modal"],
  computed: {
    computedTitle() {
      return `${this.computedModalType === "create" ? "Criar" : "Editar"} ${
        this.title
      }`;
    },
    computedModalType() {
      return useVacationModals().createEditModalType.value;
    },
    computedModal() {
      return useVacationModals().createEditModal.value;
    }
  }
};
</script>
