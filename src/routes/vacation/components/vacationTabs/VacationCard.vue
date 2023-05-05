<template>
  <div class="card d-flex flex-column" :id="`vacation-card-${vacation._id}`">
    <div class="card-body">
      <h5 class="card-title text-light">{{ computedDate }}</h5>
      <h6
        class="card-subtitle mb-2 text-warning d-block text-truncate text-center"
        :style="{ maxWidth: '170px', margin: 'auto' }"
      >
        {{ capitalizeName(vacation.worker.name) }}
      </h6>
      <p class="card-text">
        {{ text }}
      </p>
    </div>
    <div class="mt-auto card-footer w-100">
      <div class="row justify-content-center align-items-end">
        <div class="col">
          <div class="card-link">
            <router-link
              :to="{ name: 'worker', params: { _id: vacation.worker._id } }"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="`Ver perfil do(a) ${vacation.worker.name}`"
            >
              <i class="fa-solid fa-magnifying-glass"
            /></router-link>
          </div>
        </div>
        <div class="col">
          <i
            class="card-link fa-solid fa-pen text-warning text-"
            @click="handleEdit(vacation)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Clique para editar a(o) ${computedTitle}`"
          />
        </div>
        <div class="col">
          <i
            class="card-link fa-solid fa-trash text-danger text-right"
            @click="handleDelete(vacation)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Você irá deletar a(o) ${computedTitle}`"
          />
        </div>
        <div class="col">
          <i
            class="card-link fa-solid fa-print text-light text-right"
            @click="handleDownloadPdf(vacation)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Aqui você baixa o pdf da(o) ${computedTitle}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { add, format } from "date-fns";

import type { Vacation } from "@/routes/vacation/types";
import { animateCSS } from "@/animate.css/animate.css";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "VacationCard",
  props: ["vacation", "handleEdit", "handleDelete", "title"],
  data() {
    return {
      name: "",
      cardId: `vacation-card-${this.vacation._id}`,
    };
  },
  computed: {
    computedTitle() {
      return this.title?.split(" ")[1] ?? "";
    },
    text() {
      if (this.vacation.type === "dayOff")
        return this.vacation.daysQtd === 1 ? "Integral" : "Meio-período";
      return `${this.vacation.daysQtd} dias, retornando ${this.returnDate}`;
    },
    computedDate(): string {
      return format(new Date(this.vacation.startDate), "dd/MM/yyyy");
    },
    returnDate(): string {
      return format(
        add(new Date(this.vacation.endDate), {
          days: 1,
        }),
        "dd/MM/yyyy"
      );
    },
  },
  methods: {
    capitalizeName,
    async handleDownloadPdf(vacation: Vacation): Promise<void> {
      this.$router.push({
        name: "pdf",
        params: { _id: vacation._id, type: "vacation" },
      });
    },
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
i,
route-link {
  cursor: pointer;
  text-align: center;
}
a {
  color: #ddd !important;
}
.card {
  &-text {
    margin-top: 10%;
  }
}
</style>
