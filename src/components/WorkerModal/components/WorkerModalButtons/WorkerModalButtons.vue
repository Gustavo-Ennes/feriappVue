<template>
  <button type="button" class="btn btn-secondary" 
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Cancele a ação`" @click="modal?.hide">
    Cancelar
  </button>
  <button
    type="submit"
    class="btn btn-primary"
    form="workerCreateForm"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Você irá confirmar a ação`"
    :disabled="!!errors || !formModified"
  >
    {{ type === "create" ? "Criar" : "Salvar" }}
  </button>
</template>

<script lang="ts">
export default {
  name: "WorkerModalButtons",
  props: ["modal", "errors", "formModified", "type"],
};
</script>
