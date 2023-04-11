<template>
  <div class="card" :id="`vacation-card-${vacation._id}`">
    <div class="card-body">
      <h5 class="card-title text-light">{{ computedDate }}</h5>
      <h6 class="card-subtitle mb-2 text-warning">
        {{ capitalizeName(vacation.worker.name) }}
      </h6>
      <p class="card-text">
        {{ text }}
      </p>
      <div class="row justify-content-center">
        <div class="col-6">
          <small class="card-link"
            ><router-link
              :to="{ name: 'worker', params: { _id: vacation.worker._id } }"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="`Ver perfil do(a) ${vacation.worker.name}`"
              >ver trabalhador</router-link
            ></small
          >
        </div>
        <div class="col-2">
          <i
            class="col-2 card-link fa-solid fa-pen text-warning text-right"
            @click="handleEdit(vacation)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Clique para editar a(o) ${computedTitle}`"
          />
        </div>
        <div class="col-2">
          <i
            class="col-2 card-link fa-solid fa-trash text-danger text-right"
            @click="handleDelete(vacation)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Você irá deletar a(o) ${computedTitle}`"
          />
        </div>
        <div class="col-2">
          <i
            class="col-2 card-link fa-solid fa-print text-light text-right"
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

import { animateCSS } from "@/animate.css/animate.css";
import { putPdfToDownload } from "@/pdf/pdf";
import { render } from "../../pdf/render";
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
    async handleDownloadPdf(worker: Worker): Promise<void> {
      await putPdfToDownload({
        name: "Férias",
        pdfFn: render,
        instance: this.vacation,
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
}
a {
  color: #ddd !important;
}
</style>

// TOOD test the vacations
