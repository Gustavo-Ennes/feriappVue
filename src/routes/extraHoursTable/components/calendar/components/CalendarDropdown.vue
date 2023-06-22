<template>
  <div class="dropdown mb-3">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      id="dropdownMenuButton2"
      aria-expanded="false"
      @click="dropdown?.toggle"
    >
      Imprimir relatório
    </button>
    <ul
      class="dropdown-menu dropdown-menu-light"
      aria-labelledby="dropdownMenuButton2"
    >
      <li
        v-for="department in extractedDepartments"
        :key="`dropdown-department-${department._id}`"
      >
        <a
          class="dropdown-item"
          :href="`/pdf/report/${department._id}/${format(
            reference,
            'MM-yyyy'
          )}`"
          >{{ department.name }}</a
        >
      </li>
    </ul>
  </div>
  '
</template>

<script lang="ts">
import { format } from "date-fns";

export default {
  name: "CalendarDropdown",
  props: ["dropdown", "extractedDepartments", "reference"],
  methods: { format },
};
</script>
