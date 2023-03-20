<template>
  <div class="row justify-content-center align-items-stretch mx-0 mt-4">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Férias" :action="() => $router.push('/vacation')" icon-class="umbrella-beach" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Licença-prêmio"
        :action="() => $router.push('/license')"
        icon-class="plane-departure"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Abono" :action="() => $router.push('/dayOff')" icon-class="martini-glass-citrus" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Justificativas"
        action=""
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
  </div>
</template>

<script lang="ts">
import MainButton from "./components/MainButton.vue";

export default {
  name: "Home",
  components: { MainButton },
};
</script>

<style lang="scss">
.row {
  max-width: 100vw;
  display: flex;
}
</style>
