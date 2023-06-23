<template>
  <span
    :class="`px-1 text-center day text-light bg-${
      isHoliday ? 'danger' : 'secondary'
    }`"
    v-if="day"
    @click="toggleHoliday"
    >{{ day.getDate() }}</span
  >
</template>

<script lang="ts">
import {
  addToLocalStorage,
  checkIsHoliday,
  removeFromLocalStorage,
} from "../../../utils";

export default {
  name: "CalendarHoliday",
  props: ["day"],
  data() {
    return {
      isHoliday: false,
    };
  },
  methods: {
    toggleHoliday() {
      if (this.isHoliday) {
        removeFromLocalStorage({ day: this.day });
      } else {
        addToLocalStorage({ day: this.day });
      }
      this.isHoliday = !this.isHoliday;
    },
  },
  watch: {
    day() {
      if (this.day) {
        this.isHoliday = checkIsHoliday({ day: this.day });
      }
    },
  },
};
</script>

<style scoped>
.day {
  font-size: 10px;
  width: 100%;
  text-align: left !important;
  border-radius: 15px;
  padding: 5px;
}
.day:hover {
  cursor: pointer;
  font-size: 11px;
}
.col-1 {
  width: 14, 28%;
}
</style>
