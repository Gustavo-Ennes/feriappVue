<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Saída</th>
        <th scope="col">Dias</th>
        <th scope="col">Retorno</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vacation in sortedVacations" :key="vacation._id">
        <td>
          {{ capitalizeName((vacation.worker as Worker)?.name) }}
          <i
            class="fa-solid fa-magnifying-glass text-primary"
            v-if="vacation.observation"
            data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            :title="`Observação: ${vacation.observation}`" 
          ></i>
        </td>
        <td>{{ formatVacationDate(vacation.startDate) }}</td>
        <td>{{ vacation.daysQtd }}</td>
        <td>{{ formatVacationDate(vacation.endDate || "") }}</td>
        <td>
          <div class="row justify-content-strecth align-items-stretch">
            <div class="col">
              <i
                class="card-link fa-solid fa-pen text-primary text-"
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
                class="card-link fa-solid fa-print text-success text-right"
                @click="handleDownloadPdf(vacation)"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                :title="`Aqui você baixa o pdf da(o) ${computedTitle}`"
              />
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { format } from "date-fns";
import type { Worker } from "@/routes/workers/types";
import { capitalizeName } from "@/routes/utils";

import type { Vacation } from "../../types";
import { sort } from "ramda";
import { useVacationModals } from "../../composables/modals";
import { useVacations } from "../../composables/vacations";

export default {
  name: "VacationTable",
  props: ["title", "vacations"],
  computed: {
    computedTitle() {
      return this.title?.split(" ")[1] ?? "";
    },
    sortedVacations() {
      const sortByStartDate = sort(
        (a: Vacation, b: Vacation) =>
          Date.parse(b.startDate) - Date.parse(a.startDate)
      );
      return sortByStartDate(this.vacations);
    }
  },
  methods: {
    capitalizeName,
    handleEdit(vacation: Vacation) {
      const { createEditModal, setCreateEditModalType } = useVacationModals();
      const { setSelectedVacation } = useVacations();

      setSelectedVacation(vacation);
      setCreateEditModalType("edit");
      createEditModal.value?.show();
    },
    handleDelete(vacation: Vacation) {
      const { deleteConfirmationModal } = useVacationModals();
      const { setSelectedVacation } = useVacations();

      setSelectedVacation(vacation);
      deleteConfirmationModal.value?.show();
    },
    async handleDownloadPdf(vacation: Vacation): Promise<void> {
      this.$router.push({
        name: "pdf",
        params: { _id: vacation._id, type: "vacation" }
      });
    },
    formatVacationDate: (dateString: string) =>
      format(new Date(dateString), "dd/MM/yyyy")
  }
};
</script>

<style scoped>
.table {
  background-color: rgba(61, 142, 255, 0.335);
}
i {
  cursor: pointer;
}
</style>
