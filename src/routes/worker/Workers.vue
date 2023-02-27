<template>
  <div class="container">
    <div class="row justify-content-center align-items-baseline">
      <div class="col-12">
        <WorkerForm class="py-4" @searchTermUpdated="updateWorkers" />
      </div>
      <div class="col-12">
        <WorkerTable
          :workers="displayWorkers"
          class="py-4"
          v-if="displayWorkers?.length"
        />
        <h3 v-else class="label">Não há trabalhadores para o termo buscado.</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import WorkerTable from "./components/WorkerTable/WorkerTable.vue";
import WorkerForm from "./components/WorkerForm/WorkerForm.vue";
import { getWorkers } from "./getWorkers";
import type { WorkerResponseInterface, WorkersDataInterface } from "./types";

export default {
  name: "Workers",
  async beforeMount(): Promise<void> {
    const { data }: WorkerResponseInterface = await getWorkers();
    if (data?.workers) {
      this.allWorkers = data.workers;
      this.displayWorkers = this.allWorkers;
    }
  },
  data(): WorkersDataInterface {
    return {
      allWorkers: null,
      displayWorkers: null,
    };
  },
  methods: {
    updateWorkers(searchTerm: string): void {
      this.displayWorkers =
        this.allWorkers?.filter(
          ({ name, matriculation, registry }) =>
            name.includes(searchTerm) ||
            matriculation.includes(searchTerm) ||
            registry.includes(searchTerm)
        ) ?? null;
    },
  },
  components: { WorkerTable, WorkerForm },
};
</script>

<style lang="scss">
.label {
  margin-top: 40px;
  margin-left: 15px;
}
</style>
