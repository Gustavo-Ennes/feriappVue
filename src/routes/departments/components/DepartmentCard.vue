<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title"><i class="fa-solid fa-building h1" /></h5>
      <p class="card-title">{{ capitalizeName(department.name) }}</p>
      <div class="row justify-content-center">
        <div class="col-2">
          <i
            class="card-link fa-solid fa-pen text-warning text-right"
            @click="handleEdit"
          />
        </div>
        <div class="col-2">
          <i
            class="card-link fa-solid fa-trash text-danger text-right"
            @click="handleDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { capitalizeName } from "@/routes/utils";
export default {
  name: "DepartmentCard",
  props: ["department", "handleOpenModal", "handleConfirmationModal"],
  emits: ["setDepartment"],
  methods: {
    capitalizeName,
    handleEdit() {
      this.$emit("setDepartment", this.department);
      this.handleOpenModal("edit");
    },
    handleDelete() {
      // this.handleConfirmationModal();
    },
  },
};
</script>

<style lang="scss">
.fa-solid {
  cursor: pointer;
}
</style>
