<template>
  <li class="nav-item" role="presentation">
    <button
      :class="`nav-link ${active ? 'active' : ''}`"
      :id="`${period}-${type}-tab-body`"
      data-bs-toggle="tab"
      :data-bs-target="`#tab-${period}-${type}`"
      type="button"
      role="tab"
      :aria-controls="period"
      aria-selected="true"
    >
      {{ computedType }}
    </button>
  </li>
</template>

<script lang="ts">
export default {
  name: "VacationTabHeader",
  props: ["period", "active", "type"],
  computed: {
    computedType() {
      return this.period === "past"
        ? "fruídos"
        : this.period === "present"
        ? "Em andamento"
        : "Futuros";
    }
  },
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
