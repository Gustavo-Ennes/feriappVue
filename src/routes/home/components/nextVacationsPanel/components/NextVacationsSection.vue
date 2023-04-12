<template>
  <div v-if="vacations.length" class="col-12">
    <div class="py-3">
      <div class="row">
        <div class="col-12">
          <h4 class="text-primary">{{ title }}</h4>
        </div>
        <div
          v-for="vacation in vacations"
          :key="vacation._id"
          class="col-12 text-secondary"
        >
          <span class="text-truncate" :style="{ maxWidth: '120px' }">
            <i :class="iconClass"></i>
            {{ capitalizeName((vacation.worker as Worker).name) }}
          </span>
          <span class="text-center">
            {{ additionalText }} {{ finalText(vacation) }}
          </span>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Worker } from "@/routes/workers/types";
import { capitalizeName } from "@/routes/utils";
import { format } from "date-fns";
import type { Vacation } from "@/routes/vacation/types";
import { getWorkerStatus } from "../utils";

export default {
  name: "NextVacationsSection",
  props: ["vacations", "title", "additionalText", "period"],
  computed: {
    iconClass() {
      if (this.period === "start")
        return "fa-solid fa-plane-departure text-info";
      else if (this.period === "end")
        return "fa-solid fa-plane-arrival text-info";
      else if (this.period === "between")
        return "fa-solid fa-umbrella-beach text-info";
    },
  },
  methods: {
    capitalizeName,
    format,
    formatedDate(vacation: Vacation): string {
      const stringDate =
        this.period === "start" ? vacation.startDate : vacation.endDate;
      return format(new Date(stringDate as string), "dd/MM/yyyy");
    },
    finalText(vacation: Vacation) {
      return this.period !== "between"
        ? this.formatedDate(vacation)
        : getWorkerStatus(vacation.worker as Worker);
    },
  },
};
</script>
