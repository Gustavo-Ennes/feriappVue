<template>
  <button
    class="btn btn-sm btn-outline-primary mt-3 ml-3"
    type="button"
    aria-expanded="false"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`O seu formulário possui errors, veja...`"
    @click="collapse?.toggle"
  >
    Veja os erros
  </button>
  <div class="collapse" id="vacationErrorsCollapse">
    <div class="pt-2 p-1">
      <div v-for="error in errors" :key="error">
        <small class="text-danger">
          <i class="fa-solid fa-bomb text-danger"></i>{{ " " }}{{ error }}
        </small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Collapse } from "bootstrap";

export default {
  name: "VacationErrorsCollapse",
  props: ["errors"],
  data(): { collapse: null | Collapse } {
    return {
      collapse: null,
    };
  },
  mounted() {
    const collapseHTML = document.getElementById("vacationErrorsCollapse");
    this.collapse = new Collapse(collapseHTML as HTMLElement, {
      toggle: false,
    });
    this.collapse.hide();
  },
};
</script>
