<template>
  <div
    class="row g-2 text-center bg-primary text-light rounded align-items-center"
  >
    <div
      v-for="day in days"
      :class="`col h-100 pb-2 text-${
        ['Sábado', 'Domingo'].includes(day) ? 'warning' : 'light'
      }`"
    >
      {{ day }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CalendarHeader",
  props: ["days"],
};
</script>
