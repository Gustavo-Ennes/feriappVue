<template>
  <iframe
    v-if="canShowPdf"
    :src="pdfData"
    :style="{ height: '100vh !important', width: '100vw' }"
  />
</template>

<script lang="ts">
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";
import { parse } from "date-fns";

import type { PdfDataParams } from "./types";
import { runQuery } from "../../graphql/graphql";
import {
  vacationPdfQuery,
  justificationPdfQuery,
  authorizationPdfQuery,
  reportPdfPdfQuery,
  vehicleUsageReportQuery,
  materialRequisitionQuery,
  relationQuery
} from "./query";

export default {
  name: "Pdf",
  data(): PdfDataParams {
    return {
      buffer: undefined,
      params: {
        _id: undefined,
        type: undefined,
        reference: undefined,
        justification: undefined,
        period: undefined,
        vacationType: undefined
      }
    };
  },
  computed: {
    pdfData() {
      return `data:application/pdf;base64,${this.buffer}`;
    },
    canShowPdf() {
      return this.buffer !== undefined && this.buffer !== null;
    }
  },
  async beforeMount() {
    const {
      params: { type, _id, reference, justification, vacationType, period }
    }: RouteLocationNormalizedLoaded = useRoute();
    this.params._id = _id;
    this.params.type = type.toString();
    this.params.reference = parse(reference as string, "MM-yyyy", new Date());
    this.params.justification = justification as string;
    this.params.vacationType = vacationType as string;
    this.params.period = period as string;
    await this.getPdfBinary(type as string);
  },
  methods: {
    async getPdfBinary(type: string) {
      switch (type) {
        case "vacation":
          await this.getVacationPdfBinary();
          break;
        case "justification":
          await this.getJustificationPdfBinary();
          break;
        case "authorization":
          await this.getAuthorizationPdfBinary();
          break;
        case "report":
          await this.getReportPdfBinary();
          break;
        case "vehicleUsageReport":
          await this.getVehivleUsageReportPdfBinary();
          break;
        case "materialRequisition":
          await this.getMaterialRequisitionPdfBinary();
          break;
        case "relation":
          await this.getRelationPdfBinary();
          break;
        default:
          break;
      }
    },
    async getVehivleUsageReportPdfBinary() {
      const { data } = await runQuery({
        query: vehicleUsageReportQuery,
        label: "vehicleUsageReportQuery"
      });

      this.buffer = data.vehicleUsageReportPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    },
    async getMaterialRequisitionPdfBinary() {
      const { data } = await runQuery({
        query: materialRequisitionQuery,
        label: "materialRequisitionQuery"
      });

      this.buffer = data.materialRequisitionPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    },
    async getAuthorizationPdfBinary() {
      const { _id: workerId, reference } = this.params;
      const { data } = await runQuery({
        query: authorizationPdfQuery,
        label: "autorizationPdfQuery",
        variables: { workerId, reference }
      });

      this.buffer = data.authorizationPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    },
    async getReportPdfBinary() {
      const { _id: departmentId, reference } = this.params;
      const { data } = await runQuery({
        query: reportPdfPdfQuery,
        label: "reportPdfQuery",
        variables: { departmentId, reference }
      });

      this.buffer = data.reportPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    },
    async getRelationPdfBinary() {
      const { period, vacationType } = this.params;
      const { data } = await runQuery({
        query: relationQuery,
        label: "relationPdfQuery",
        variables: { period, type: vacationType }
      });

      this.buffer = data.relationPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    },
    async getJustificationPdfBinary() {
      const { _id } = this.params;
      const { data } = await runQuery({
        query: justificationPdfQuery,
        label: "justificationPdfQuery",
        variables: { workerId: _id }
      });

      this.buffer = data.justificationPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    },
    async getVacationPdfBinary() {
      const { _id } = this.params;
      const { data } = await runQuery({
        query: vacationPdfQuery,
        label: "vacationPdfQuery",
        variables: { vacationId: _id }
      });

      this.buffer = data.vacationPdf;
      if (this.buffer === null) {
        this.$router.push("/notFound");
      }
    }
  }
};
</script>
