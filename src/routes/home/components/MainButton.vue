<template>
  <div class="my-2 button d-grid gap-2 w-100">
    <button class="btn btn-outline-primary text-center" @click="action">
      <i :class="`fa-solid fa-${iconClass}`"></i> <br />
      {{ label }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "MainButton",
  props: ["label", "action", "iconClass"],
};
</script>

<style lang="scss" scoped>
.button {
  height: 30vh;
  width: 200px;
  text-align: center;
  :hover {
      color: #ffa600;
  }
}
.btn {
  width: 100%;
  border: 3px solid rgb(0, 140, 255);
  background-color: rgba(0, 0, 188, 0.1);
  .fa-solid {
    font-size: 30px;
  }
  &:hover {
    border: 2px solid #ffa600;
  background-color: rgb(0, 137, 250);
  }
}
</style>
