<template>
  <h5 class="modal-title" id="vacationModalLabel">
    {{ computedTitle }}
  </h5>
  <i
    class="fa-regular fa-circle-xmark text-danger h4"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Fechar o modal"
    @click="modal.hide"
  ></i>
</template>

<script lang="ts">
export default {
  name: "VacationModalHeader",
  props: ["title", "modal", "modalType"],
  computed: {
    computedTitle() {
      return `${this.modalType === "create" ? "Criar" : "Editar"} ${
        this.title
      }`;
    },
  },
};
</script>
