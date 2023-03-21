<template>
  <form
    @submit.prevent="submitForm(computedForm)"
    class="row justify-content-center align-items-center"
    id="departmentCreateForm"
  >
    <div class="col-12 mt-3">
      <label class="form-label">Nome</label>
      <input
        class="form-control"
        placeholder="Nome"
        v-model="form.name"
        required
      />
    </div>
  </form>
</template>

<script lang="ts">
import type { DepartmentModalFormDataInterface } from "../../../types";

export default {
  name: "DepartmentModalForm",
  props: ["submitForm", "department"],
  data(): DepartmentModalFormDataInterface {
    return {
      form: {
        name: this.department?.name || "",
      },
    };
  },
  computed: {
    computedForm() {
      return this.form;
    },
  },
  watch: {
    form: {
      handler() {
        this.$emit("formUpdated", this.computedForm);
      },
      deep: true,
    },
    department: {
      handler() {
        if (this.department) {
          this.form = { ...this.department };
        } else {
          this.form = {
            name: "",
          };
        }
      },
      deep: true,
    },
  },
};
</script>
