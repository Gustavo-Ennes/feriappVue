<template>
  <div class="table-responsive text-center">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Função</th>
          <th scope="col">Status</th>
          <th scope="col">Data admissão</th>
          <th scope="col">Departamento</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="worker in workers">
          <td>
            <router-link
              :to="{
                name: 'worker',
                params: { _id: worker._id },
              }"
              >{{ capitalizeName(worker.name) }}</router-link
            >
          </td>
          <td>{{ worker.role }}</td>
          <td>{{ getTranslatedStatus(worker.status) }}</td>
          <td>{{ getAdmissionDate(worker) }}</td>
          <td>{{ capitalizeName(worker?.department.name) }}</td>
          <td>
            <i
              class="fa-solid fa-trash-can text-danger px-xs-1 px-2 px-md-4"
              @click="handleDelete(worker)"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="`Você deletará o(a) ${worker.name.toLowerCase()}`"
            ></i>
            <i
              class="fa-solid fa-pen text-warning"
              @click="handleEdit(worker)"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="`clique para editar o(a) ${worker.name.toLowerCase()}`"
            ></i>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";

import type { Worker, WorkerTableDataInterface } from "../../types";
import { getTranslatedStatus } from "./status";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "WorkerTable",
  props: ["workers", "departments", "openConfirmationModal"],
  data(): WorkerTableDataInterface {
    return {
      confirmationModal: undefined,
    };
  },
  methods: {
    capitalizeName,
    getTranslatedStatus,
    handleDelete(worker: Worker) {
      this.$emit("selectWorker", worker);
      this.openConfirmationModal();
    },
    handleEdit(worker: Worker) {
      this.$emit("selectWorker", worker);
      this.$emit("openModal", "edit");
    },
    getAdmissionDate(worker: Worker) {
      return format(new Date(worker.admissionDate), "dd/MM/yyyy");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-xs {
  width: 10px;
  text-align: center;
  font-size: 8px;
}
.fa-solid {
  cursor: pointer;
}
</style>

// TODO see why don delete workers
