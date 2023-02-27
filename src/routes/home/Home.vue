<template>
  <div class="row justify-content-around align-items-stretch mx-0 mt-4">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Férias" action="" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Licença-prêmio" action="" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Abono" action="" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Justificativas" action="" />
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
