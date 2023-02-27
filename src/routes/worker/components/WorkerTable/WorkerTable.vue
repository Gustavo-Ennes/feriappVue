<template>
  <div class="table-responsive text-center">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
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
          <th scope="row">{{ worker.id }}</th>
          <td>{{ worker.name }}</td>
          <td>{{ worker.role }}</td>
          <td>{{ worker.status }}</td>
          <td>{{ getAdmissionDate(worker) }}</td>
          <td>{{ worker.departmentId }}</td>
          <td>
            <i class="fa-solid fa-trash-can text-danger px-xs-1 px-2 px-md-4"></i>
            <i class="fa-solid fa-pen text-warning"></i>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";

import type { Worker } from "../../types";

export default {
  name: "WorkerTable",
  props: ["workers"],
  methods: {
    getAdmissionDate(worker: Worker) {
      return format(new Date(worker.admissionDate), "dd/MM/yyyy");
    },
  },
};
</script>

<style lang="scss">
.btn-xs {
  width: 10px;
  text-align: center;
  font-size: 8px;
}
</style>
