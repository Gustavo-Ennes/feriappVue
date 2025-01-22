<template>
  <div class="row justify-content-center align-items-stretch mx-0 mt-4">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Férias"
        :action="() => $router.push('/vacation')"
        icon-class="umbrella-beach"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Licença-prêmio"
        :action="() => $router.push('/license')"
        icon-class="plane-departure"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Abono"
        :action="() => $router.push('/dayOff')"
        icon-class="martini-glass-citrus"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Justificativas"
        :action="async () => $store.dispatch('openJustificationModal')"
        icon-class="magnifying-glass-dollar"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Trabalhadores"
        :action="() => $router.push('/workers')"
        icon-class="id-card"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Retornos e saídas"
        :action="() => offcanvas?.show()"
        icon-class="cart-flatbed-suitcase"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Relatório de uso de veículo"
        :action="
          () =>
            $router.push({
              name: 'pdf',
              params: { type: 'vehicleUsageReport' }
            })
        "
        icon-class="car"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Requisição de materiais"
        :action="
          () =>
            $router.push({
              name: 'pdf',
              params: { type: 'materialRequisition' }
            })
        "
        icon-class="box"
      />
    </div>
  </div>
  <VacationsPanel />
</template>

<script lang="ts">
import { Offcanvas } from "bootstrap";
import MainButton from "./components/MainButton.vue";
import VacationsPanel from "./components/VacationsPanel/VacationsPanel.vue";
import type { HomeDataType } from "./types";

export default {
  name: "Home",
  components: { MainButton, VacationsPanel },
  data(): HomeDataType {
    return {
      offcanvas: undefined
    };
  },
  mounted() {
    const el = document.getElementById("offcanvasVacations");
    this.offcanvas = new Offcanvas(el as HTMLElement);
  }
};
</script>
