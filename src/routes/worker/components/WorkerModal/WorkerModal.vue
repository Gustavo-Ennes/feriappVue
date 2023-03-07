<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <WorkerModalHeader :type="type" :modal="modal" />
        </div>
        <div class="modal-body">
          <WorkerModalForm
            :departments="departments"
            @formUpdated="processForm"
            :submit-form="worker ? handleUpdate : handleCreate"
            :worker="worker"
          />
          <WorkerErrorsCollpase :errors="errors" v-if="!!errors" />
        </div>
        <div class="modal-footer">
          <WorkerModalButtons
            :modal="modal"
            :errors="errors"
            :form-modified="formModified"
            :type="type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GeneralToast from "../../../../components/GeneralToast.vue";
import type {
  WorkerFormType,
  WorkerModalDataInterface,
  WorkerModalFormDataInterface,
} from "../../types";
import { getDepartments, createWorker, updateWorker } from "../../fetch";
import { validateForm } from "./components/WorkerModalForm/form";
import WorkerModalForm from "./components/WorkerModalForm/WorkerModalForm.vue";
import WorkerErrorsCollpase from "./components/WorkerErrorsCollapse/WorkerErrorsCollapse.vue";
import WorkerModalButtons from "./components/WorkerModalButtons/WorkerModalButtons.vue";
import WorkerModalHeader from "./components/WorkerModalHeader/WorkerModalHeader.vue";

export default {
  name: "WorkerModal",
  props: ["type", "modal", "worker"],
  emits: ["workerCreated"],
  async beforeMount() {
    const {
      data: { departments },
    } = await getDepartments();
    this.departments = departments;
  },
  methods: {
    prepareToastPayload({
      type,
      success,
      name,
    }: {
      type: string;
      success: boolean;
      name: string;
    }): void {
      this.toastPayload = {
        title: success
          ? `Trabalhador foi ${type === "create" ? "criado" : "modificado"}`
          : `Houve um problema na ${
              type === "create" ? "criação" : "midificação"
            } do trabalhador`,
        text: success
          ? `O trabalhador ${name} foi ${
              type === "create" ? "criado" : "modificado"
            } com sucesso.`
          : `algo deu errado na ${
              type === "create" ? "criação" : "modificação"
            } do ${name}.`,
        type: success ? "info" : "danger",
      };
    },
    async processForm(data: WorkerModalFormDataInterface): Promise<void> {
      console.log(
        "🚀 ~ file: WorkerModal.vue:88 ~ processForm ~ data:",
        JSON.stringify(data, null, 2)
      );
      const { errors }: WorkerFormType = await validateForm(data);
      this.errors = errors;
      if (!this.formModified) this.formModified = true;
    },
    async handleCreate(data: WorkerModalFormDataInterface): Promise<void> {
      const { validatedForm, errors } = await validateForm(data);
      if (validatedForm) {
        const { data } = await createWorker(validatedForm);
        if (!errors && data.createWorker) {
          this.$emit("workerCreated");
        }
        this.modal?.hide();
        this.prepareToastPayload({
          name: validatedForm.name,
          type: "create",
          success: !!data.createWorker,
        });
        this.$store.dispatch("showToast", this.toastPayload);
      }
    },
    async handleUpdate(data: WorkerModalFormDataInterface): Promise<void> {
      const { validatedForm, errors } = await validateForm(data);
      const response = { success: false };
      if (validatedForm) {
        response.success = await updateWorker(validatedForm);
      }
      this.modal?.hide();
      this.prepareToastPayload({
        name: validatedForm.name,
        type: "edit",
        success: response.success,
      });
      this.$store.dispatch("showToast", this.toastPayload);
    },
  },
  data(): WorkerModalDataInterface {
    return {
      departments: [],
      dataToSend: undefined,
      errors: undefined,
      formModified: false,
      toastPayload: undefined,
    };
  },
  components: {
    WorkerModalForm,
    WorkerErrorsCollpase,
    WorkerModalButtons,
    WorkerModalHeader,
    GeneralToast,
  },
};
</script>

<style lang="scss">
.fa-circle-xmark {
  cursor: pointer;
}
.col-12 {
  padding-top: 0;
  padding-bottom: 0;
}
small {
  font-size: 9px;
}
</style>
