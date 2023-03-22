<template>
  <div
    class="modal fade"
    id="justificationModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="justificationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <JustificationModalHeader
            @close="$store.dispatch('closeJustificationModal')"
          />
        </div>
        <div class="modal-body">
          <JustificationModalForm
            :submit-form="handleCreateJustificationPDF"
            @set-worker="handleSetSelectedWorker"
          />
        </div>
        <div class="modal-footer">
          <JustificationModalButtons
            @close="$store.dispatch('closeJustificationModal')"
            :worker="selectedWorker"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import type { Worker } from "@/routes/workers/types";
import JustificationModalForm from "./components/JustificationModalForm.vue";
import JustificationModalHeader from "./components/JustificationModalHeader.vue";
import JustificationModalButtons from "./components/JustificationModalButtons.vue";
import type { JustificationModalData } from "./types";
import { putPdfToDownload } from "@/pdf/pdf";
import { render } from "./pdf/render";

export default {
  name: "JustificationModal",
  data(): JustificationModalData {
    return {
      selectedWorker: null,
    };
  },
  methods: {
    handleSetSelectedWorker(worker: Worker) {
      this.selectedWorker = worker;
    },
    async handleCreateJustificationPDF(): Promise<void> {
      await putPdfToDownload({
        name: "Férias",
        pdfFn: render,
        instance: this.selectedWorker as Worker,
      });
    },
  },
  components: {
    JustificationModalButtons,
    JustificationModalForm,
    JustificationModalHeader,
  },
};
</script>
