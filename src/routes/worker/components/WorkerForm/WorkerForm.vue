<template>
  <div class="p-3">
    <div class="row justify-content-center align-items-center">
      <div class="col-12">
        <h1 class="py-4">Trabalhador</h1>
      </div>
      <div class="col-12">
        <label for="workerSearchTerm pt-4">Buscar trabalhador</label>
        <input
          id="workerSearchTerm"
          class="form-control"
          placeholder="Nome ou matrícula"
          v-model="searchTerm"
        />
      </div>
      <div class="col-12 float-right">
        <button class="btn btn-primary mt-2 w-100" @click="instantiateModal">
          <i class="fa-solid fa-user-plus p-1"></i>{{ " " }} Trabalhador
        </button>
      </div>
    </div>
  </div>
  <WorkerModal type="create" :modal="modal" />
</template>

<script lang="ts">
import { Modal } from "bootstrap";

import type { WorkerFormDataInterface } from "../../types";
import WorkerModal from "../WorkerModal/WorkerModal.vue";

export default {
  name: "WorkerForm",
  data(): WorkerFormDataInterface {
    return {
      searchTerm: "",
      modal: undefined,
    };
  },
  watch: {
    searchTerm() {
      this.$emit("searchTermUpdated", this.searchTerm);
    },
  },
  methods: {
    instantiateModal() {
      const modalHTML = document.getElementById("exampleModal");
      this.modal = new Modal(modalHTML as HTMLElement, {});
      this.modal.show();
    },
  },
  components: { WorkerModal },
};
</script>
