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
          :key="(selectedWorker as Worker)._id"
          :value="(selectedWorker as Worker)._id"
        >
          {{ nameCapitalized((selectedWorker as Worker).name) }}
        </option>
      </select>
    </div>
  </form>
</template>

<script lang="ts">
import { capitalizeName } from "@/routes/utils";
import type { Worker } from "@/routes/workers/types";

export default {
  name: "JustificationModalForm",
  props: ["workers"],
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
      console.log(
        "Worker changed in ModalForm: ",
        JSON.stringify(worker, null, 2)
      );
    },
  },
  methods: {
    nameCapitalized(name: string): string {
      return capitalizeName(name);
    },
    submitForm({ worker }: { worker: string | null }) {
      if (worker) {
        window.location.href = `http${
          import.meta.env.MODE !== "development" ? "s" : ""
        }://${window.location.hostname}:${
          window.location.port
        }/pdf/justification/${worker}`;
      }
    },
  },
};
</script>
