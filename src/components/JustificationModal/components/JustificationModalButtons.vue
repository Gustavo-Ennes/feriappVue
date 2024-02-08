<template>
  <button
    type="button"
    class="btn btn-secondary"
    @click="$emit('close')"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Voltar a página anterior"
  >
    Cancelar
  </button>
  <button
    type="submit"
    class="btn btn-primary"
    :disabled="!worker"
    form="justificationForm"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Imprima justificativas de horas extras`"
    @click="$emit('close')"
  >
    Imprimir
  </button>
</template>

<script lang="ts">
export default {
  name: "JustificationModalButtons",
  emits: ["close"],
  props: ["worker"]
};
</script>
