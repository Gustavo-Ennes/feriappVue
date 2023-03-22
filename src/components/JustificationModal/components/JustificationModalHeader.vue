<template>
  <h5 class="modal-title" id="departmentModal">
    Imprimir justificativas de H.E.
  </h5>
  <i class="fa-regular fa-circle-xmark text-danger h4" @click="$emit('close')"></i>
</template>

<script lang="ts">
export default {
  name: "JustificationModalHeader",
  emits: ["close"],
};
</script>