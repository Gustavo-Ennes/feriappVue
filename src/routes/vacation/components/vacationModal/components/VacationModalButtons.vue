<template>
  <button type="button" class="btn btn-secondary" @click="modal?.hide">
    Cancelar
  </button>
  <button
    type="submit"
    class="btn btn-primary"
    :disabled="!!errors || !formModified"
    form="vacationCreateForm"
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
