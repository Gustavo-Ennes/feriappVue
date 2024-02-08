<template>
  <button
    class="btn btn-sm btn-outline-primary mt-3 ml-3"
    type="button"
    aria-expanded="false"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`seu formulário possui erro(s), veja...`"
    @click="collapse?.toggle"
  >
    Veja os erros
  </button>
  <div class="collapse" id="errorsCollapse">
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
  name: "WorkerErrorsCollapse",
  props: ["errors"],
  data(): { collapse: null | Collapse } {
    return {
      collapse: null
    };
  },
  mounted() {
    const collapseHTML = document.getElementById("errorsCollapse");
    this.collapse = new Collapse(collapseHTML as HTMLElement, {
      toggle: false
    });
    this.collapse.hide();
  }
};
</script>
