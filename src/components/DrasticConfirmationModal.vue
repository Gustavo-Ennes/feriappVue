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
            {{ computedTitle }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Feche o modal`"
          ></button>
        </div>
        <div class="modal-body text-center">
          <p class="text-center">
            {{ computedText }}
          </p>
          <small class="fw-bold">{{ computedAnswer }}</small>
        </div>
        <div class="modal-footer text-light bg-danger">
          <button
            type="button"
            class="btn btn-link text-light"
            data-bs-dismiss="modal"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Cancele a ação`"
          >
            {{ computedCancelButtonLabel }}
          </button>
          <button
            type="button"
            class="btn btn-outline-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="`Confirme a ação`"
            @click="sendDeleteConfirmation"
          >
            {{ computedConfirmDrasticActionButtonLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DeleteConfirmationModal",
  props: [
    "_id",
    "title",
    "text",
    "answer",
    "cancelButtonLabel",
    "confirmDrasticActionButtonLabel",
    "confirmationCallback",
    "hideCallback",
    "type"
  ],
  data() {
    return {
      modal: {
        title: "Tem certeza?",
        text: "Você está prestes a deletar algo permanentemente.",
        answer: "Tem certeza que quer continuar?",
        cancelButtonLabel: "Cancelar",
        confirmDrasticActionButtonLabel: "Deletar"
      }
    };
  },
  computed: {
    computedTitle() {
      return this.title ?? this.modal.title;
    },
    computedText() {
      return this.text ?? this.modal.text;
    },
    computedAnswer() {
      return this.answer ?? this.modal.answer;
    },
    computedCancelButtonLabel() {
      return this.cancelButtonLabel ?? this.modal.cancelButtonLabel;
    },
    computedConfirmDrasticActionButtonLabel() {
      return (
        this.confirmDrasticActionButtonLabel ??
        this.modal.confirmDrasticActionButtonLabel
      );
    }
  },
  methods: {
    async sendDeleteConfirmation(): Promise<void> {
      const toastPayload: { title?: string; text?: string; type?: string } = {};
      try {
        await this.confirmationCallback();
        toastPayload.title = `Sucesso!`;
        toastPayload.text = `Deletedo(a) com sucesso`;
        toastPayload.type = "info";
      } catch (error: any) {
        console.log(
          "Error executing DrasticConfirmationModal confirmationCallback prop method:\n",
          error.message
        );
        toastPayload.title = `Algo deu errado!`;
        toastPayload.text = `Algo deu errado ao deletar. Tente novamente mais tarde`;
        toastPayload.type = "danger";
      } finally {
        this.$store.dispatch("showToast", toastPayload);
        // setSelectedVacation(undefined);
        // deleteConfirmationModal.value?.hide();
      }
    },
    handleConfirmationModalHide() {
      this.hideCallback();
    }
  }
};
</script>
