<template>
  <div class="row justify-content-center align-items-stretch mx-0 mt-4">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Férias" action="" icon-class="file-circle-plus" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Licença-prêmio"
        action=""
        icon-class="file-circle-plus"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton label="Abono" action="" icon-class="file-circle-plus" />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Justificativas"
        action=""
        icon-class="file-circle-plus"
      />
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <MainButton
        label="Trabalhadores"
        :action="() => $router.push('/workers')"
        icon-class="helmet-safety"
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
