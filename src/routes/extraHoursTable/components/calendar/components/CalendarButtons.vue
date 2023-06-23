<template>
  <div class="row justify-content-center align-items-center text-center">
    <div class="col-12"><h4 class="rounded bg-primary text-light">Ações</h4></div>
    <div class="col-12">
      <CalendarDropdown
        :dropdown="dropdown"
        :extracted-departments="extractedDepartments"
        :reference="reference"
      />
    </div>
    <div class="col-12">
      <button
        :disabled="!reference || !worker"
        class="btn btn-primary"
        @click="handleSeeAuthorization"
      >
        <i class="fa-solid fa-print text-warning" />
        Imprimir autorização de hora extra
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import CalendarDropdown from "./CalendarDropdown.vue";

export default {
  name: "CalendarButtons",
  props: ["dropdown", "extractedDepartments", "reference", "worker"],
  methods: {
    handleSeeAuthorization() {
      this.$router.push({
        name: "pdf",
        params: {
          type: "authorization",
          _id: this.worker._id,
          reference: format(this.reference, "MM-yyyy"),
        },
      });
    },
  },
  components: { CalendarDropdown },
};
</script>
