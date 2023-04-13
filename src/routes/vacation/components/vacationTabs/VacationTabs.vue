<template>
  <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
    <VacationTabHeader type="future" :active="true" />
    <VacationTabHeader type="present" />
    <VacationTabHeader type="past" />
  </ul>

  <div class="tab-content">
    <VacationTabBody
      type="future"
      :vacation-type="vacationType"
      :title="title"
      :vacations="futureVacations(vacations)"
      :active="true"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="present"
      :vacation-type="vacationType"
      :title="title"
      :vacations="presentVacations(vacations)"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <VacationTabBody
      type="past"
      :vacation-type="vacationType"
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
  props: ["vacations", "title", "vacationType"],
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
