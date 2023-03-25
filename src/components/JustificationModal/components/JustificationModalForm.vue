<template>
  <form
    @submit.prevent="submitForm(computedForm)"
    class="row justify-content-center align-items-center"
    id="justificationForm"
  >
    <div class="col-xs-12 col-sm-8 my-2">
      <label class="form-label">Trabalhador</label>
      <select
        class="form-select"
        aria-label="Worker select"
        v-model="form.worker"
        required
      >
        <option selected :value="null">Selecione o trabalhador</option>
        <option
          v-for="selectedWorker in workers"
          :key="selectedWorker._id"
          :value="selectedWorker._id"
        >
          {{ selectedWorker.name }}
        </option>
      </select>
    </div>
  </form>
</template>

<script lang="ts">
import { getWorkers } from "@/routes/workers/fetch";
import type { Worker } from "@/routes/workers/types";

export default {
  name: "JustificationModalForm",
  props: ["submitForm", "workers"],
  emits: ["setWorker"],
  data(): { form: { worker: string | null } } {
    return {
      form: {
        worker: null,
      },
    };
  },
  computed: {
    computedForm() {
      return this.form;
    },
  },
  watch: {
    "form.worker": function () {
      const worker = this.workers.filter(
        ({ _id }: Worker) => _id === this.form.worker
      )[0];
      this.$emit("setWorker", worker);
    },
  },
};
</script>
