<template>
  <div class="spinner-box">
    <div class="white-orbit leo h3 text-primary">f</div>

    <div class="yellow-orbit leo"></div>

    <div class="white-orbit leo"></div>

    <div class="yellow-orbit w1 leo"></div>
    <div class="white-orbit w2 leo"></div>
    <div class="yellow-orbit w3 leo"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "OrbitLoading",
};
</script>

<style scoped>
@keyframes spin3D {
  from {
    transform: rotate3d(0.5, 0.5, 0.5, 360deg);
  }
  to {
    transform: rotate3d(0deg);
  }
}

.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.leo {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.yellow-orbit {
  width: 120px;
  height: 120px;
  border: 1px solid #e9df174f;
  -webkit-animation: spin3D 2s linear 0s infinite;
  animation: spin3D 2s linear 0s infinite;
}

.white-orbit {
  width: 90px;
  height: 90px;
  border: 1px solid #ffffff5c;
  -webkit-animation: spin3D 1s linear 0s infinite;
  animation: spin3D 1s linear 0s infinite;
}
.w1 {
  transform: rotate3D(1, 1, 1, 90deg);
}

.w2 {
  transform: rotate3D(1, 2, 0.5, 90deg);
}

.w3 {
  transform: rotate3D(0.5, 1, 2, 90deg);
}
</style>
