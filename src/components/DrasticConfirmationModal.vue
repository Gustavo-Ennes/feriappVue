<template>
  <div
    class="modal modal-danger fade"
    :id="_id"
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
        <div class="modal-body text-center">
          <p class="text-center">
            Você está prestes a deletar algo permanentemente.
          </p>
          <small class="fw-bold">Tem certeza que quer continuar?</small>
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
export default {
  name: "DeleteConfirmationModal",
  props: ["_id", "confirmationCallback"],
  emits: ["hide"],
  methods: {
    async sendDeleteConfirmation(): Promise<void> {
      const toastPayload: { title?: string; text?: string; type?: string } = {};
      try {
        await this.confirmationCallback();
        toastPayload.title = `Sucesso!`;
        toastPayload.text = `Deletedo(a) com sucesso`;
        toastPayload.type = "info";
      } catch (error) {
        toastPayload.title = `Algo deu errado!`;
        toastPayload.text = `Algo deu errado ao deletar. Tente novamente mais tarde`;
        toastPayload.type = "danger";
      } finally {
        this.$store.dispatch("showToast", toastPayload);
        this.$emit("hide");
      }
    },
  },
};
</script>
