<template>
  <h5 class="modal-title" id="departmentModal">
    {{ type === "create" ? "Criar" : "Editar" }} setor
  </h5>
  <i class="fa-regular fa-circle-xmark text-danger h4" 
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Você fechará o modal" @click="modal.hide"></i>
</template>

<script lang="ts">
export default {
  name: "DepartmentModalHeader",
  props: ["type", "modal"],
};
</script>