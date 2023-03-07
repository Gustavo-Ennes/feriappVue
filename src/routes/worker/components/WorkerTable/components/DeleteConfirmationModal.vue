<template>
  <div
    class="modal modal-danger fade"
    id="deleteConfirmationModal"
    tabindex="-1"
    aria-labelledby="deleteConfirmationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-light">
          <h5 class="modal-title" id="deleteConfirmationModalLabel">
            Tem certeza?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-center">
            Você está prestes a deletar algo permanentemente.
          </p>
          <small>Tem certeza que quer continuar?</small>
        </div>
        <div class="modal-footer text-light bg-danger">
          <button
            type="button"
            class="btn btn-link text-light"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="btn btn-outline-light"
            @click="sendDeleteConfirmation"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { deleteWorker } from "./deleteWorker";

export default {
  name: "DeleteConfirmationModal",
  props: ["worker"],
  emits: ["hide", "deleteWorker"],
  methods: {
    async sendDeleteConfirmation(): Promise<void> {
      const toastPayload: { title?: string; text?: string; type?: string } = {};
      try {
        await deleteWorker({ _id: this.worker._id });
        this.$emit("deleteWorker", this.worker);
        toastPayload.title = `Sucesso!`;
        toastPayload.text = `Você deletou com sucesso o trabalhador ${this.worker.name}`;
        toastPayload.type = "danger";
      } catch (error) {
        toastPayload.title = `Algo deu errado!`;
        toastPayload.text = `Algo deu errado ao deletar um trabalhador. Tente novamente mais tarde`;
        toastPayload.type = "danger";
      } finally {
        this.$store.dispatch("showToast", toastPayload);
        this.$emit("hide");
      }
    },
  },
};
</script>
