<template>
  <div class="my-2 button d-grid gap-2 w-100">
    <button class="btn btn-primary text-center" @click="action">
      {{ label }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "MainButton",
  props: ["label", "action"],
};
</script>

<style lang="scss" scoped>
.button {
  width: 200px;
  text-align: center;
}
.btn {
  width: 100%;
}
</style>
