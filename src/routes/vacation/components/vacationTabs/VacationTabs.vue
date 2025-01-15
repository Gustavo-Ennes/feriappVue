<template>
  <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
    <VacationTabHeader :type="type" period="future" :active="true" />
    <VacationTabHeader :type="type" period="present" />
    <VacationTabHeader :type="type" period="past" />
  </ul>

  <div class="tab-content">
    <VacationTabBody
      period="future"
      :type="type"
      :title="title"
      :active="true"
      :pagination="futureVacations"
    />
    <VacationTabBody
      period="present"
      :type="type"
      :title="title"
      :pagination="presentVacations"
    />
    <VacationTabBody
      period="past"
      :type="type"
      :title="title"
      :pagination="pastVacations"
    />
  </div>
</template>

<script lang="ts">
import VacationTabHeader from "./VacationTabHeader.vue";
import VacationTabBody from "./VacationTabBody.vue";
import { futureVacations, pastVacations, presentVacations } from "../../utils";
import { useVacations } from "../../composables/vacations";

export default {
  name: "VacationTabs",
  props: ["title", "type"],
  emits: ["openModal"],
  components: { VacationTabHeader, VacationTabBody },
  async beforeMount() {
    await useVacations().fetchVacations({ type: this.type });
  },
  computed: {
    pastVacations() {
      return useVacations().pastVacations.value;
    },
    presentVacations() {
      return useVacations().presentVacations.value;
    },
    futureVacations() {
      return useVacations().futureVacations.value;
    }
  }
};
</script>
