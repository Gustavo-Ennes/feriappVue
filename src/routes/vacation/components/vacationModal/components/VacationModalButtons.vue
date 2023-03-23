<template>
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Cancele a ação`"
    @click="modal?.hide"
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
    {{ modalType === "create" ? "Criar" : "Salvar" }}
  </button>
</template>

<script lang="ts">
export default {
  name: "VacationModalButtons",
  props: ["modal", "errors", "formModified", "type", "modalType"],
};
</script>
