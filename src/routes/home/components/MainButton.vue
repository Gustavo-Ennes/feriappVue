<template>
  <button
    class="btn btn-primary my-2 d-grid w-100 text-center"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="`Atalho para ${label.toLowerCase()}`"
    @click="action"
  >
    <i :class="`fa-solid fa-${iconClass}`"></i> <br />
    {{ label }}
  </button>
</template>

<script lang="ts">
export default {
  name: "MainButton",
  props: ["label", "action", "iconClass"]
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #1877f2;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.5s ease;

  &:hover {
    background-color: #155cbd; /* Darker blue on hover */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .fa-solid {
    margin-right: 8px;
    font-size: 20px; /* Icon size */
  }
}
</style>
