<template>
  <div
    class="modal fade"
    id="vacationModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="vacationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <VacationModalHeader :title="title" />
        </div>
        <div class="modal-body">
          <VacationModalForm
            @formUpdated="processForm"
            :workers="workers"
            :submit-form="computedVacation ? handleUpdate : handleCreate"
            :vacation="computedVacation"
            :type="type"
          />
          <VacationErrorsCollpase :errors="errors" v-if="!!errors" />
        </div>
        <div class="modal-footer">
          <VacationModalButtons
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
import { format, set, parse } from "date-fns";

import GeneralToast from "../../../../components/GeneralToast.vue";
import type {
  VacationFetchInterface,
  VacationFormType,
  VacationModalDataInterface,
  VacationModalFormDataInterface
} from "../../types";
import { getWorkers, createVacation, updateVacation } from "../../fetch";
import { validateForm } from "./components/form";
import VacationModalForm from "./components/VacationModalForm.vue";
import VacationErrorsCollpase from "./components/VacationModalErrorsCollapse.vue";
import VacationModalButtons from "./components/VacationModalButtons.vue";
import VacationModalHeader from "./components/VacationModalHeader.vue";
import { useVacationModals } from "../../composables/modals";
import { useVacations } from "../../composables/vacations";

export default {
  name: "VacationModal",
  props: ["type", "modal", "title"],
  emits: ["vacationChanged"],
  async beforeMount() {
    const {
      data: { workers }
    } = await getWorkers();
    this.workers = workers;
  },
  methods: {
    createVacation,
    updateVacation,
    handleSubmitForm(data: VacationModalFormDataInterface) {
      const { selectedVacation } = useVacations();
      return selectedVacation.value
        ? this.handleUpdate(data)
        : this.handleCreate(data);
    },
    async prepareToastPayload({
      type,
      success,
      date
    }: {
      type: string;
      success: boolean;
      date: string;
      error?: { message: string };
    }): Promise<void> {
      this.toastPayload = {
        icon: `${success ? "calendar-check" : "bomb"}`,
        title: success
          ? `${this.title} em ${date} ${
              type === "create" ? "criado" : "modificado"
            }`
          : `Houve um problema na ${
              type === "create" ? "criação" : "modificação"
            } do ${this.title.toLowerCase()}`,
        text: success
          ? `O ${this.title.toLowerCase()} em ${date} foi ${
              type === "create" ? "criado" : "modificado"
            } com sucesso.`
          : `Verifique se o(a) ${this.title.toLowerCase()} não converge com qualquer outro tipo de folga do trabalhador.`,
        type: success ? "info" : "danger"
      };
    },
    async processForm(data: VacationModalFormDataInterface): Promise<void> {
      const { errors }: VacationFormType = await validateForm(data);
      this.errors = errors;
      if (!this.formModified) this.formModified = true;
    },
    async handleCreate(payload: VacationModalFormDataInterface): Promise<void> {
      const { validatedForm } = await validateForm(payload);
      const { fetchVacations } = useVacations();

      validatedForm.startDate = set(
        parse(validatedForm.startDate, "yyyy-MM-dd", new Date()),
        { milliseconds: 1 }
      ).toISOString();

      if (validatedForm) {
        const { data, errors }: VacationFetchInterface = await createVacation(
          validatedForm
        );
        if (!errors && data?.createVacation) {
          await fetchVacations({ type: this.type });
        }
        this.computedModal?.hide();
        await this.prepareToastPayload({
          error: errors?.[0],
          date: format(new Date(validatedForm.startDate), "dd-MM-yyyy"),
          type: "create",
          success: !!data?.createVacation
        });
        this.$store.dispatch("showToast", this.toastPayload);
        this.$router.push({
          name: "pdf",
          params: { _id: data?.createVacation?._id, type: "vacation" }
        });
      }
    },
    async handleUpdate(payload: VacationModalFormDataInterface): Promise<void> {
      const { setSelectedVacation, fetchVacations } = useVacations();
      const { validatedForm, errors } = await validateForm(payload);
      const response = { success: false };
      delete validatedForm.subType;
      delete validatedForm.endDate;

      if (validatedForm) {
        const { data, errors }: VacationFetchInterface = await updateVacation(
          validatedForm
        );
        if (!errors && data?.updateVacation) {
          response.success = true;
          await fetchVacations({ type: this.type });
          setSelectedVacation(undefined);
        }
      }
      this.computedModal?.hide();
      this.prepareToastPayload({
        error: errors?.[0],
        date: format(new Date(validatedForm.startDate), "dd-MM-yyyy"),
        type: "info",
        success: response.success
      });
      this.$store.dispatch("showToast", this.toastPayload);
    }
  },
  data(): VacationModalDataInterface {
    return {
      workers: [],
      dataToSend: undefined,
      errors: undefined,
      formModified: false,
      toastPayload: undefined
    };
  },
  computed: {
    computedModal() {
      return useVacationModals().createEditModal.value;
    },
    computedVacation() {
      return useVacations().selectedVacation.value;
    },
    computedModalType() {
      return useVacationModals().createEditModalType.value;
    }
  },
  watch: {
    'computedModalType.value'() {
      if (this.computedModalType === "create")
        useVacations().setSelectedVacation(undefined);
    }
  },
  components: {
    VacationModalForm,
    VacationErrorsCollpase,
    VacationModalButtons,
    VacationModalHeader,
    GeneralToast
  }
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
