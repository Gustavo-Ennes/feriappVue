<template>
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Cancele a ação`"
    @click="computedModal?.hide"
  >
    Cancelar
  </button>
  <button
    type="submit"
    class="btn btn-primary"
    form="vacationCreateForm"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Você confirmará a ação`"
    :disabled="!!errors || !formModified"
  >
    {{ computedModalType === "create" ? "Criar" : "Salvar" }}
  </button>
</template>

<script lang="ts">
import { useVacationModals } from "@/routes/vacation/composables/modals";

export default {
  name: "VacationModalButtons",
  props: ["errors", "formModified", "type"],
  computed: {
    computedModal() {
      return useVacationModals().createEditModal.value;
    },
    computedModalType() {
      return useVacationModals().createEditModalType.value;
    }
  }
};
</script>
