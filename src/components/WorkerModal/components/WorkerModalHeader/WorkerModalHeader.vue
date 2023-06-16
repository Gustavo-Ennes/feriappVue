<template>
  <h5 class="modal-title" id="exampleModalLabel">
    {{ type === "create" ? "Criar" : "Editar" }} trabalhador
  </h5>
  <i class="fa-regular fa-circle-xmark text-danger h4" @click="modal.hide"></i>
</template>

<script lang="ts">
export default {
  name: "WorkerModalHeader",
  props: ["type", "modal"],
};
</script>
