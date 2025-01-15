import { Modal } from "bootstrap";
import { ref } from "vue";

const createEditModal = ref<Modal>();
const createEditModalType = ref<string>("create");
const deleteConfirmationModal = ref<Modal>();

export function useVacationModals() {
  const instantiateModals = () => {
    if (!deleteConfirmationModal.value) {
      const modalHTML = document.getElementById("vacationConfirmationModal");
      deleteConfirmationModal.value = new Modal(modalHTML as HTMLElement);
    }
    if (!createEditModal.value) {
      const modalHTML = document.getElementById("vacationModal");
      createEditModal.value = new Modal(modalHTML as HTMLElement, {});
    }
  };

  const setCreateEditModalType = (type: string) =>
    (createEditModalType.value = type);

  return {
    instantiateModals,
    setCreateEditModalType,
    createEditModalType,
    createEditModal,
    deleteConfirmationModal
  };
}
