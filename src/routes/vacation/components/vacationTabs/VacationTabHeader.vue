<template>
  <li class="nav-item" role="presentation">
    <button
      :class="`nav-link ${active ? 'active' : ''}`"
      :id="`${type}-tab`"
      data-bs-toggle="tab"
      :data-bs-target="`#${type}`"
      type="button"
      role="tab"
      :aria-controls="type"
      aria-selected="true"
    >
      {{ computedType }}
    </button>
  </li>
</template>

<script lang="ts">
export default {
  name: "VacationTabHeader",
  props: ["type", "active"],
  computed: {
    computedType() {
      return this.type === "past"
        ? "fruídos"
        : this.type === "present"
        ? "Em andamento"
        : "Futuros";
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  background-color: rgb(0, 89, 255) !important;
  color: white !important;
}

.nav-link.active {
  background-color: rgb(0, 162, 255) !important;
  color: rgb(255, 246, 163) !important;
}
</style>
