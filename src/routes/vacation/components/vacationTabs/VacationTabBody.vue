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
    </div>
  </div>
</template>

<script lang="ts">
import VacationTable from "./VacationTable.vue";

export default {
  name: "VacationTabBody",
  props: [
    "type",
    "vacations",
    "active",
    "handleEdit",
    "handleDelete",
    "title",
    "vacationType",
  ],
  computed: {
    model() {
      if (this.vacationType === "dayOff") return "abonos";
      else if (this.vacationType === "license") return "licenças-prêmio";
      else if (this.vacationType === "vacation") return "férias";
    },
    time() {
      if (this.type === "present") return "em andamento";
      else if (this.type === "past") return "fruídas(os)";
      else if (this.type === "future") return "futuras(os)";
    },
  },
  components: { VacationTable },
};
</script>
