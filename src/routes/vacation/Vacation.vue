<template>
  <div class="container my-3 text-center">
    <div class="row g-2 justify-content-center">
      <h1 class="col-4 offset-4 pt-4 text-center">{{ computedTitle }}</h1>
      <h1 class="col pt-4 text-center">
        <button
          class="btn btn-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title="`Você criará um(a) ${computedTitle.toLowerCase()}`"
          @click="showModal"
        >
          <i class="fa-solid fa-plus" /> {{ computedButtonLabel }}
        </button>
      </h1>
      <div class="col-12">
        <VacationTabs
          ref="tabs"
          :title="computedButtonLabel"
          :type="type"
        />
      </div>
    </div>
  </div>
  <VacationModal
    :type="type"
    :title="computedTitle"
  />
  <DrasticConfirmationModal
    _id="vacationConfirmationModal"
    :type="type"
  />
</template>

<script lang="ts">
import DrasticConfirmationModal from "@/components/DrasticConfirmationModal.vue";
import VacationTabs from "./components/vacationTabs/VacationTabs.vue";
import VacationModal from "./components/vacationModal/VacationModal.vue";
import { useVacations } from "./composables/vacations";
import { useVacationModals } from "./composables/modals";

export default {
  name: "Vacation",
  props: ["type"],
  computed: {
    computedTitle() {
      return this.type === "dayOff"
        ? "Abono"
        : this.type === "vacation"
        ? "Férias"
        : "Licença Prêmio";
    },
    computedButtonLabel() {
      if (this.type === "dayOff") return "novo abono";
      else if (this.type === "vacation") return "novas férias";
      else if (this.type === "license") return "nova licença-prêmio";
    }
  },
  methods: {
    showConfirmationModal() {
      const { deleteConfirmationModal } = useVacationModals();
      deleteConfirmationModal.value?.show();
    },
    showModal() {
      const { createEditModal, setCreateEditModalType } = useVacationModals();
      const { setSelectedVacation } = useVacations();

      setSelectedVacation(undefined);
      setCreateEditModalType("create");
      createEditModal.value?.show();
    }
  },
  components: {
    VacationTabs,
    VacationModal,
    DrasticConfirmationModal
  },
  mounted() {
    const { instantiateModals } = useVacationModals();
    instantiateModals();
  },
};
</script>
