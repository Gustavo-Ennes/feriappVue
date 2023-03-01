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
            :submit-form="sendData"
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
import type {
  WorkerFormType,
  WorkerModalDataInterface,
  WorkerModalFormDataInterface,
} from "../../types";
import { getDepartments, createWorker } from "./fetch";
import { validateForm } from "./components/WorkerModalForm/form";
import WorkerModalForm from "./components/WorkerModalForm/WorkerModalForm.vue";
import WorkerErrorsCollpase from "./components/WorkerErrorsCollapse/WorkerErrorsCollapse.vue";
import WorkerModalButtons from "./components/WorkerModalButtons/WorkerModalButtons.vue";
import WorkerModalHeader from "./components/WorkerModalHeader/WorkerModalHeader.vue";

export default {
  name: "WorkerModal",
  props: ["type", "modal"],
  async beforeMount() {
    const {
      data: { departments },
    } = await getDepartments();
    this.departments = departments;
  },
  methods: {
    async processForm(data: WorkerModalFormDataInterface): Promise<void> {
      const { errors }: WorkerFormType = await validateForm(data);
      this.errors = errors;
      if (!this.formModified) this.formModified = true;
    },
    async sendData(data: WorkerModalFormDataInterface): Promise<void> {
      const { validatedForm } = await validateForm(data);
      if (validatedForm) {
        const newWorker = await createWorker(validatedForm);
        this.modal?.hide();
      }
    },
  },
  data(): WorkerModalDataInterface {
    return {
      departments: [],
      dataToSend: undefined,
      errors: undefined,
      formModified: false,
    };
  },
  components: {
    WorkerModalForm,
    WorkerErrorsCollpase,
    WorkerModalButtons,
    WorkerModalHeader,
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
