<template>
  <div class="card" :id="`vacation-card-${vacation._id}`">
    <div class="card-body">
      <h5 class="card-title text-light">{{ computedDate }}</h5>
      <h6 class="card-subtitle mb-2 text-warning">
        {{ vacation.worker.name }}
      </h6>
      <p class="card-text">
        {{ text }}
      </p>
      <div class="row justify-content-center">
        <div class="col-6">
          <small class="card-link">ver trabalhador</small>
        </div>
        <div class="col-2">
          <i
            class="col-2 card-link fa-solid fa-pen text-warning text-right"
            @click="handleEdit(vacation)"
          />
        </div>
        <div class="col-2">
          <i
            class="col-2 card-link fa-solid fa-trash text-danger text-right"
            @click="handleDelete(vacation)"
          />
        </div>
        <div class="col-2">
          <i class="col-2 card-link fa-solid fa-print text-light text-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { add, format } from "date-fns";

import { animateCSS } from "@/animate.css/animate.css";

export default {
  name: "VacationCard",
  props: ["vacation", "handleEdit", "handleDelete"],
  data() {
    return {
      name: "",
      cardId: `vacation-card-${this.vacation._id}`,
    };
  },
  computed: {
    text() {
      if (this.vacation.type === "dayOff")
        return this.vacation.daysQtd === 1 ? "Integral" : "Meio-período";
      return `Duração: ${this.vacation.daysQtd} dias, retornando ${this.returnDate}`;
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

<style lang="scss" scoped>
i {
  cursor: pointer;
}
</style>
