<template>
  <div
    :class="`tab-pane ${active ? 'active' : ''}`"
    :id="type"
    role="tabpanel"
    :aria-labelledby="`${type}-tab`"
  >
    <div class="m-3 p-3">
      <div
        class="row justify-content-center align-items-start g-1"
        v-if="vacations.length"
      >
        <VacationTable
          :title="title"
          :vacations="vacations"
          :handle-edit="handleEdit"
          :handle-delete="handleDelete"
        />
      </div>
      <h4 class="text-center" v-else>Não há {{ model }} {{ time }}.</h4>
      <div
        class="row justify-content-center align-items-start g-1"
        v-if="vacations?.length"
      >
        <div class="col-4">
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            @click="handlePageChange(previousPage)"
            v-if="previousPage !== null"
          >
            Anterior
          </button>
        </div>
        <div class="col-4">
          <span class="btn btn-sm b-4" @click="handlePageChange(1)">1</span>
          <span v-if="pagination?.pageNumber > 1">...</span>
          <span
            v-if="
              pagination?.pageNumber > 1 &&
              pagination?.pageNumber < pagination?.totalPages
            "
            class="btn btn-sm b-4"
          >
            {{ pagination?.pageNumber }}
          </span>
          <span>...</span>
          <span
            class="btn btn-sm b-4"
            @click="handlePageChange(pagination?.totalPages)"
            :aria-disabled="pagination?.pageNumber === pagination?.totalPages"
            >{{ pagination?.totalPages }}</span
          >
        </div>
        <div class="col-4">
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            @click="handlePageChange(nextPage)"
            v-if="nextPage !== null"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VacationTable from "./VacationTable.vue";

export default {
  emits: ["pageChanged"],
  name: "VacationTabBody",
  props: [
    "type",
    "vacations",
    "pagination",
    "active",
    "handleEdit",
    "handleDelete",
    "title",
    "vacationType"
  ],
  computed: {
    previousPage() {
      return this.pagination?.pageNumber > 1
        ? this.pagination?.pageNumber - 1
        : null;
    },
    nextPage() {
      return this.pagination?.pageNumber < this.pagination?.totalPages
        ? this.pagination?.pageNumber + 1
        : null;
    },
    model() {
      if (this.vacationType === "dayOff") return "abonos";
      else if (this.vacationType === "license") return "licenças-prêmio";
      else if (this.vacationType === "vacation") return "férias";
    },
    time() {
      if (this.type === "present") return "em andamento";
      else if (this.type === "past") return "fruídas(os)";
      else if (this.type === "future") return "futuras(os)";
    }
  },
  components: { VacationTable },
  methods: {
    handlePageChange(targetPage: number) {
      if (
        targetPage > 0 &&
        targetPage <= this.pagination?.totalPages &&
        targetPage !== this.pagination?.pageNumber
      )
        this.$emit("pageChanged", targetPage);
    }
  }
};
</script>
