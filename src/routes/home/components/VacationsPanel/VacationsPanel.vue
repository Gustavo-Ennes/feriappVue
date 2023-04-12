<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasVacations"
    aria-labelledby="offcanvasVacationsLabel"
  >
    <div class="offcanvas-header w-100">
      <h3 class="offcanvas-title text-primary text-center w-100" id="offcanvasVacationsLabel">Retornos e saídas</h3>
    </div>
    <div class="offcanvas-body text-center">
      <div class="row g-2 justify-content-center align-items-start">
        <NextVacationsSection
          :vacations="vacationsInFuture"
          title="Logo menos"
          additional-text=" saindo dia "
          period="start"
        />
        <NextVacationsSection
          :vacations="vacationsInPresent"
          title="Folgando hoje"
          additional-text=" está "
          period="between"
        />
        <NextVacationsSection
          :vacations="vacationsInPast"
          title="Retornando"
          additional-text=" retornando dia "
          period="end"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getVacations } from "../../fetch";
import type { VacationDataType } from "../../types";
import { nextVacations, presentVacations, pastVacations } from "./utils";
import { format } from "date-fns";
import type { Worker } from "../../../workers/types";
import NextVacationsSection from "./components/VacationsPanelSection.vue";

export default {
  name: "VacationsPanel",
  data(): VacationDataType {
    return {
      vacations: [],
    };
  },
  async beforeMount(): Promise<void> {
    const { data } = await getVacations();
    this.vacations = data.vacations;
  },
  computed: {
    workerStatus(worker: Worker): string | void {
      if (worker.status === "vacation") return "de férias";
      else if (worker.status === "license") return "de licença prêmio";
      else if (worker.status === "dayOff") return "abonando";
    },
    vacationsInPast() {
      return this.vacations ? pastVacations(this.vacations) : [];
    },
    vacationsInFuture() {
      return this.vacations ? nextVacations(this.vacations) : [];
    },
    vacationsInPresent() {
      return this.vacations ? presentVacations(this.vacations) : [];
    },
  },
  methods: { format },
  components: { NextVacationsSection },
};
</script>
