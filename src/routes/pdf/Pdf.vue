<template>
  <iframe
    v-if="canShowPdf"
    :src="pdfData"
    :style="{ height: '100vh !important', width: '100vw' }"
  />
</template>

<script lang="ts">
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";

import type { PdfDataParams, Params } from "./types";
import { runQuery } from "../../graphql/graphql";
import { vacationPdfQuery as query } from "./query";

export default {
  name: "Pdf",
  data(): PdfDataParams {
    return {
      buffer: undefined,
      params: {
        _id: undefined,
        type: undefined,
      },
    };
  },
  computed: {
    pdfData() {
      return `data:application/pdf;base64,${this.buffer}`;
    },
    canShowPdf() {
      return this.buffer !== undefined && this.buffer !== null;
    },
  },
  async beforeMount() {
    const { params }: RouteLocationNormalizedLoaded = useRoute();
    this.params._id = params._id ?? "";
    this.params.type = params.type ?? "";
    await this.getPdfBinary();
  },
  methods: {
    async getPdfBinary() {
      const { data } = await runQuery({
        query,
        label: "vacationPdfQuery",
        variables: { _id: this.params?._id, type: this.params?.type },
      });

      this.buffer = data.vacationPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    },
  },
};
</script>
