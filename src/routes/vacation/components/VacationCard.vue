<template>
  <div class="card" :id="`vacation-card-${vacation._id}`">
    <div class="card-body">
      <h5 class="card-title text-light">{{ computedDate }}</h5>
      <h6 class="card-subtitle mb-2 text-warning">{{ name }}</h6>
      <p class="card-text">
        {{ text }}
      </p>
      <div class="row justify-content-center">
        <div class="col-8">
          <small class="card-link">ver trabalhador</small>
        </div>
        <div class="col-2">
          <i class="col-2 card-link fa-solid fa-trash text-danger text-right" />
        </div>
        <div class="col-2">
          <i
            class="col-2 card-link fa-solid fa-print text-warning text-right"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { add, format } from "date-fns";

import type { WorkerFetchInterface } from "../types";
import { getWorkerById } from "../fetch";
import { animateCSS } from "@/animate.css/animate.css";

export default {
  name: "VacationCard",
  props: ["vacation"],
  data() {
    return {
      name: "",
      cardId: `vacation-card-${this.vacation._id}`,
    };
  },
  async beforeMount(): Promise<void> {
    const { data }: WorkerFetchInterface = await getWorkerById({
      _id: this.vacation.workerId,
    });
    console.log("🚀 ~ file: VacationCard.vue:35 ~ beforeMount ~ data:", data);
    this.name = data?.worker?.name ?? "";
  },
  computed: {
    text() {
      return this.vacation.type === "dayOff"
        ? "Período integral"
        : `Duração: ${this.vacation.daysQtd} dias, retornando ${this.returnDate}`;
    },
    computedDate(): string {
      return format(new Date(this.vacation.startDate), "dd/MM/yyyy");
    },
    returnDate(): string {
      return format(
        add(new Date(this.vacation.startDate), {
          days: this.vacation.daysQtd + 1,
        }),
        "dd/MM/YYYY"
      );
    },
  },
  methods: {
    animateCard(): void {
      animateCSS({
        elementId: this.cardId,
        animation: "bounce",
        velocity: "fast",
      });
    },
  },
};
</script>

<style lang="scss">
i {
  cursor: pointer;
}
</style>
