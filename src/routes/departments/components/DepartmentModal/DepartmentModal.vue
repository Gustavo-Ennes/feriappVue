<template>
  <div
    class="modal fade"
    id="departmentModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="departmentModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <DepartmentHeader :type="type" :modal="modal" />
        </div>
        <div class="modal-body">
          <DepartmentForm
            @formUpdated="processForm"
            :submit-form="department ? handleUpdate : handleCreate"
            :department="department"
          />
        </div>
        <div class="modal-footer">
          <DepartmentButtons
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
  DepartmentFormInterface,
  DepartmentModalDataInterface,
  ValidatedResponse,
} from "../../types";
import { validateForm } from "./components/form";
import DepartmentHeader from "./components/DepartmentHeader.vue";
import DepartmentButtons from "./components/DepartmentButtons.vue";
import DepartmentForm from "./components/DepartmentForm.vue";
import { createDepartment, updateDepartment } from "../../fetch";

export default {
  name: "DepartmentModal",
  emits: ["formSubmitted"],
  props: ["modal", "type", "department"],
  methods: {
    async processForm(data: DepartmentFormInterface): Promise<void> {
      const { errors }: ValidatedResponse = await validateForm(data);
      this.errors = errors;
      if (!this.formModified) this.formModified = true;
    },
    async handleCreate(data: DepartmentFormInterface): Promise<void> {
      const { validatedForm, errors } = await validateForm(data);

      if (validatedForm) {
        const { data } = await createDepartment(validatedForm);
        if (!errors && data.createDepartment) {
          this.$emit("formSubmitted");
        }
        this.modal?.hide();
        this.prepareToastPayload({
          name: validatedForm?.name || "",
          type: "create",
          success: !!data.createDepartment,
        });
        this.$store.dispatch("showToast", this.toastPayload);
      }
    },
    async handleUpdate(data: DepartmentFormInterface): Promise<void> {
      const { validatedForm, errors } = await validateForm(data);
      const response = { success: false };
      if (validatedForm) {
        response.success = await updateDepartment(validatedForm);
        this.$emit("formSubmitted");
      }
      this.modal?.hide();
      this.prepareToastPayload({
        name: validatedForm?.name || "",
        type: "edit",
        success: response.success,
      });
      this.$store.dispatch("showToast", this.toastPayload);
    },
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
          ? `Setor foi ${type === "create" ? "criado" : "modificado"}`
          : `Houve um problema na ${
              type === "create" ? "criação" : "midificação"
            } do setor`,
        text: success
          ? `O setor ${name} foi ${
              type === "create" ? "criado" : "modificado"
            } com sucesso.`
          : `algo deu errado na ${
              type === "create" ? "criação" : "modificação"
            } do setor ${name}.`,
        type: success ? "info" : "danger",
      };
    },
  },
  data(): DepartmentModalDataInterface {
    return {
      toastPayload: undefined,
      formModified: false,
      errors: undefined,
      dataToSend: undefined,
    };
  },
  components: {
    DepartmentHeader,
    DepartmentButtons,
    DepartmentForm,
  },
};
</script>
