<template>
  <div
    :class="`tab-pane ${active ? 'active' : ''}`"
    :id="`tab-${period}-${type}`"
    role="tabpanel"
    :aria-labelledby="`${period}-${type}-tab-body`"
  >
    <div class="m-3 p-3">
      <div
        class="row justify-content-center align-items-start g-1"
        v-if="vacations?.length"
      >
        <div class="col-12 text-secondary"><p :style="{textAlign: 'right'}">Resultados: {{ pagination.totalResults }}</p></div>
        <VacationTable :title="title" :vacations="vacations" />
      </div>
      <h4 class="text-center" v-else>Não há {{ model }} {{ time }}.</h4>
      <div
        class="row justify-content-center align-items-start g-1"
        v-if="vacations?.length"
      >
        <VacationPagination
          :handle-page-change="handlePageChange"
          :pagination="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useVacations } from "../../composables/vacations";
import VacationPagination from "./VacationPagination.vue";
import VacationTable from "./VacationTable.vue";

export default {
  name: "VacationTabBody",
  props: ["active", "title", "type", "period", "pagination"],
  computed: {
    vacations() {
      return this.pagination?.items ?? [];
    },
    model() {
      if (this.type === "dayOff") return "abonos";
      else if (this.type === "license") return "licenças-prêmio";
      else if (this.type === "vacation") return "férias";
    },
    time() {
      if (this.period === "present") return "em andamento";
      else if (this.period === "past") return "fruídas(os)";
      else if (this.period === "future") return "futuras(os)";
    }
  },
  components: { VacationTable, VacationPagination },
  methods: {
    async handlePageChange(targetPage: number) {
      const { fetchVacations } = useVacations();
      if (
        targetPage > 0 &&
        targetPage <= this.pagination?.totalPages &&
        targetPage !== this.pagination?.pageNumber
      )
        await fetchVacations({
          type: this.type,
          ...(this.period === "past" && { pastPage: targetPage }),
          ...(this.period === "present" && { presentPage: targetPage }),
          ...(this.period === "future" && { futurePage: targetPage })
        });
    }
  },
  watch: {
    async type() {
      useVacations().resetVacations();
      await useVacations().fetchVacations({type: this.type})
    }
  }
};
</script>
