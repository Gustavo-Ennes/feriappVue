<template>
  <div class="row g-2 justify-content-center align-items-center">
    <div class="col-4 offset-8">
      <button class="btn btn-sm mb-3" @click="handlePrintRelation">
        Imprimir relação
      </button>
    </div>
    <div class="col-12">
      <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <VacationTabHeader
          :type="type"
          period="future"
          :active="true"
          @tab-clicked="() => (period = 'future')"
        />
        <VacationTabHeader
          :type="type"
          period="present"
          @tab-clicked="() => (period = 'present')"
        />
        <VacationTabHeader
          :type="type"
          period="past"
          @tab-clicked="() => (period = 'past')"
        />
      </ul>
    </div>
    <div class="col-12">
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
    </div>
  </div>
</template>

<script lang="ts">
import VacationTabHeader from "./VacationTabHeader.vue";
import VacationTabBody from "./VacationTabBody.vue";
import { useVacations } from "../../composables/vacations";

export default {
  name: "VacationTabs",
  props: ["title", "type"],
  emits: ["openModal"],
  components: { VacationTabHeader, VacationTabBody },
  async beforeMount() {
    await useVacations().fetchVacations({ type: this.type });
  },
  data() {
    return {
      period: "future"
    };
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
  },
  methods: {
    handlePrintRelation() {
      this.$router.push({
        name: "pdf",
        params: {
          type: "relation",
          vacationType: this.type,
          period: this.period
        }
      });
    }
  }
};
</script>
