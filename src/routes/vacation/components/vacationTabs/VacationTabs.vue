<template>
  <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
    <VacationTabHeader type="future" :active="true" />
    <VacationTabHeader type="present" />
    <VacationTabHeader type="past" />
  </ul>

  <div class="tab-content">
    <VacationTabBody
      type="future"
      :title="title"
      :vacations="futureVacations(vacations)"
      :active="true"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="present"
      :title="title"
      :vacations="presentVacations(vacations)"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="past"
      :vacations="pastVacations(vacations)"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
  </div>
</template>

<script lang="ts">
import VacationTabHeader from "./VacationTabHeader.vue";
import VacationTabBody from "./VacationTabBody.vue";
import { futureVacations, pastVacations, presentVacations } from "../../utils";
import type { Vacation } from "../../types";

export default {
  name: "VacationTabs",
  props: ["vacations", "title"],
  emits: ["selectVacation", "openModal", "deleteVacation"],
  components: { VacationTabHeader, VacationTabBody },
  methods: {
    pastVacations,
    futureVacations,
    presentVacations,
    handleEdit(vacation: Vacation): void {
      this.$emit("selectVacation", vacation);
      this.$emit("openModal", "edit");
    },
    handleDelete(vacation: Vacation): void {
      this.$emit("selectVacation", vacation);
      this.$emit("deleteVacation", vacation._id);
    },
  },
};
</script>
