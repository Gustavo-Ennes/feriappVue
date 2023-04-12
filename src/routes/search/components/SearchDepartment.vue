<template>
  <div class="row justify-content-center g-2">
    <div class="col-12">
      <h4>Departamentos</h4>
    </div>
    <div class="col-12">
      <ol class="list-group list-group-numbered">
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
          v-for="department in departments"
          :key="department._id"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ capitalizeName(department.name) }}</div>
          </div>
          <span
            class="badge bg-primary rounded-pill"
            @click="$router.push('/departments')"
          >
            <i class="fa-solid fa-magnifying-glass" />
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { capitalizeName } from "@/routes/utils";
export default {
  name: "SearchDepartment",
  props: ["departments"],
  methods: { capitalizeName },
};
</script>
