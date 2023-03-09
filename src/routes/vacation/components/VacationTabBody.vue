<template>
  <div
    :class="`tab-pane ${active ? 'active' : ''}`"
    :id="type"
    role="tabpanel"
    :aria-labelledby="`${type}-tab`"
  >
    <div class="m-3 p-3">
      <div class="row justify-content-center gap-1">
        <div
          v-for="vacation in vacations"
          :key="vacation._id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <VacationCard :vacation="vacation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VacationCard from "./VacationCard.vue";

export default {
  name: "VacationTabBody",
  props: ["type", "vacations", "active"],
  components: { VacationCard },
};
</script>
