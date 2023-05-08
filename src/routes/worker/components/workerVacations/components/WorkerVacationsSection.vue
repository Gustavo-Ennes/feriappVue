<template>
  <div class="container my-5">
    <div class="row g-1">
      <h3 class="col-12 text-primary">{{ computedType }}</h3>
      <div v-for="vacation in vacations" :key="vacation._id" class="col-12">
        <i class="fa-solid fa-right-long text-info"></i> {{ text(vacation) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Vacation } from "@/routes/vacation/types";
import { format } from "date-fns";

export default {
  name: "WorkerVacationsSection",
  props: ["vacations", "type"],
  computed: {
    computedType() {
      if (this.type === "vacation") return "Férias";
      else if (this.type === "license") return "Licenças-Prêmio";
      else if (this.type === "dayOff") return "Abonos";
    },
  },
  methods: {
    abonoText(subtype?: string) {
      return subtype === "halfDay" ? "meio-período" : "integral";
    },
    text(vacation: Vacation): string {
      return `Saindo ${format(new Date(vacation.startDate), "dd/MM/yyyy")} ~ ${
        this.type !== "dayOff" ? vacation.daysQtd : ""
      } ${this.type !== "dayOff" ? "dias" : this.abonoText(vacation?.subType)}`;
    },
  },
};
</script>
