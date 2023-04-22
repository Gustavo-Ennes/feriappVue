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
        <div
          v-for="vacation in vacations"
          :key="vacation._id"
          class="col-xs-8 col-sm-8 col-md-4 col-lg-3"
        >
          <div class="d-flex justify-content-center">
            <VacationCard
              :title="title"
              :vacation="vacation"
              :handleEdit="handleEdit"
              :handleDelete="handleDelete"
            />
          </div>
        </div>
      </div>
      <h4 class="text-center" v-else>Não há {{ model }} {{ time }}.</h4>
    </div>
  </div>
</template>

<script lang="ts">
import VacationCard from "./VacationCard.vue";

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
  components: { VacationCard },
};
</script>
