<template>
  <form
    @submit.prevent="submitForm(computedForm)"
    class="row justify-content-center align-items-center"
    id="workerCreateForm"
  >
    <div class="col-12 mt-3">
      <label class="form-label">Nome</label>
      <input
        class="form-control"
        placeholder="Nome"
        v-model="form.name"
        required
      />
    </div>
    <div class="col-xs-12 col-sm-6 my-2">
      <label class="form-label">Registro</label>
      <input
        class="form-control"
        placeholder="Registro"
        v-model="form.registry"
        required
      />
    </div>
    <div class="col-xs-12 col-sm-6 my-2">
      <label class="form-label">Matrícula</label>
      <input
        class="form-control"
        placeholder="Matrícula"
        v-model="form.matriculation"
        required
      />
    </div>
    <div class="col-xs-12 my-2">
      <label class="form-label">Função</label>
      <input
        class="form-control"
        placeholder="Função"
        v-model="form.role"
        required
      />
    </div>
    <div class="col-xs-12 my-2">
      <label class="form-label">Justificativa(H.E.)</label>
      <input
        class="form-control"
        placeholder="Justificativa"
        v-model="form.justification"
        required
      />
    </div>
    <div class="col-xs-12 col-sm-8 my-2">
      <label class="form-label">Departamento</label
      ><select
        class="form-select"
        aria-label="Default select example"
        v-model="form.departmentId"
        required
      >
        <option selected :value="null">Selecione o departamento</option>
        <option
          v-for="department in departments"
          :key="department._id"
          :value="department._id"
        >
          {{ capitalizeName(department.name) }}
        </option>
      </select>
    </div>
    <div class="col-xs-12 col-sm-4 my-2">
      <label class="form-label">Admissão</label>
      <input
        class="form-control"
        type="date"
        v-model="form.admissionDate"
        placeholder="ex: 03/12/1990"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { format } from "date-fns";
import type { WorkerModalFormDataInterface } from "../../types";
import { capitalizeName } from "@/routes/utils";

export default {
  name: "WorkerModalForm",
  props: ["departments", "submitForm", "worker"],
  data(): WorkerModalFormDataInterface {
    return {
      form: {
        name: this.worker?.name || "",
        role: this.worker?.role || "",
        matriculation: this.worker?.matriculation || "",
        registry: this.worker?.registry || "",
        admissionDate: this.worker?.admissionDate || "",
        departmentId: this.worker?.department?._id || null,
        justification: this.worker?.justification
      }
    };
  },
  computed: {
    computedForm() {
      return { ...this.form, department: this.form.departmentId };
    }
  },
  watch: {
    form: {
      handler() {
        this.$emit("formUpdated", this.computedForm);
      },
      deep: true
    },
    worker: {
      handler() {
        if (this.worker) {
          const admissionDate = format(
            new Date(this.worker.admissionDate),
            "yyyy-MM-dd"
          );
          this.form = {
            ...this.worker,
            admissionDate,
            departmentId: this.worker.department._id
          };
        } else {
          this.form = {
            name: "",
            role: "",
            matriculation: "",
            registry: "",
            admissionDate: "",
            departmentId: null
          };
        }
      },
      deep: true
    }
  },
  methods: { capitalizeName }
};
</script>
