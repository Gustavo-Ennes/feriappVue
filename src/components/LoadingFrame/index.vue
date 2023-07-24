<template>
  <div v-if="$store.state.loading" class="loading">
    <OrbitLoading />
  </div>
</template>

<script lang="ts">
import OrbitLoading from "./OrbitLoading.vue";

export default {
  name: "LoadingFrame",
  components: { OrbitLoading },
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  display: flex;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(24, 124, 255, 0.78);
  color: #e7ecb5;
  z-index: 9999;
}
.spinner {
  top: 50%;
  left: 50%;
}
</style>
