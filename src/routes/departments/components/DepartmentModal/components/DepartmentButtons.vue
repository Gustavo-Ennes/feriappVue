<template>
  <button type="button" class="btn btn-secondary" @click="modal?.hide">
    Cancelar
  </button>
  <button
    type="submit"
    class="btn btn-primary"
    :disabled="!!errors || !formModified"
    form="departmentCreateForm"
  >
    {{ type === "create" ? "Criar" : "Salvar" }}
  </button>
</template>

<script lang="ts">
export default {
  name: "DepartmentModalButtons",
  props: ["modal", "errors", "formModified", "type"],
};
</script>
