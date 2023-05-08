<template>
  <div class="loader">
    <span style="--i: 1"></span>
    <span style="--i: 2"></span>
    <span style="--i: 3"></span>
    <span style="--i: 4"></span>
    <span style="--i: 5"></span>
    <span style="--i: 6"></span>
    <span style="--i: 7"></span>
    <span style="--i: 8"></span>
    <span style="--i: 9"></span>
    <span style="--i: 10"></span>
    <span style="--i: 11"></span>
    <span style="--i: 12"></span>
    <span style="--i: 13"></span>
    <span style="--i: 14"></span>
    <span style="--i: 15"></span>
    <span style="--i: 16"></span>
    <span style="--i: 17"></span>
    <span style="--i: 18"></span>
    <span style="--i: 19"></span>
    <span style="--i: 20"></span>
    <div class="plane">
      <ion-icon name="airplane-sharp" class="icon"></ion-icon>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoadingAirplane",
};
</script>

<style scoped>
.loader {
  position: relative;
  width: 100px;
  height: 100px;
}
.loader span {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
}
.loader span::before {
  content: "";
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(5px);
  transform: scale(0);
  animation: load 2s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes load {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  10% {
    transform: scale(1.2);
    opacity: 1;
  }
  80%,
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
.plane {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  animation: rotate 2s linear infinite;
  animation-delay: -1.5s;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.plane .icon {
  font-size: 50px;
  color: #fff;
  position: absolute;
  top: -10px;
  left: 80px;
  transform: rotate(45deg);
}
</style>
