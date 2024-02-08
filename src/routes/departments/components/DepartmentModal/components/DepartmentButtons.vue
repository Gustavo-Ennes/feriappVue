<template>
  <button
    type="button"
    class="btn btn-secondary"
    @click="modal?.hide"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Voltar a página anterior"
  >
    Cancelar
  </button>
  <button
    type="submit"
    class="btn btn-primary"
    :disabled="!!errors || !formModified"
    form="departmentCreateForm"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Irá ${buttonTitle.toLocaleLowerCase()} pra você`"
  >
    {{ buttonTitle }}
  </button>
</template>

<script lang="ts">
export default {
  name: "DepartmentModalButtons",
  props: ["modal", "errors", "formModified", "type"],
  computed: {
    buttonTitle() {
      return this.type === "create" ? "Criar" : "Salvar";
    }
  }
};
</script>
