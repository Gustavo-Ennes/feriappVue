<template>
  <div class="p-3">
    <div class="row gap-2 justify-content-center align-items-center">
      <div class="col-12">
        <h1 class="pt-4 text-center">Trabalhador</h1>
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
        <button class="btn btn-primary mt-2 w-100" @click="handleCreate">
          <i class="fa-solid fa-user-plus p-1"></i>{{ " " }} Trabalhador
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { WorkerFormDataInterface } from "../../types";

export default {
  name: "WorkerForm",
  emits: ["selectWorker", "openModal", "searchTermUpdated"],
  data(): WorkerFormDataInterface {
    return {
      searchTerm: "",
    };
  },
  methods: {
    handleCreate() {
      this.$emit("selectWorker");
      this.$emit("openModal", "create");
    },
  },
  watch: {
    searchTerm() {
      this.$emit("searchTermUpdated", this.searchTerm);
    },
  },
};
</script>
