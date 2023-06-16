<template>
  <div class="col-12" @click="handleToggleEdit">
    <div class="input-group sunGroup">
      <span
        class="input-group-text text-warning border-0 bg-transparent"
        id="basic-addon1"
        ><i class="fa-regular fa-sun"
      /></span>
      <input
        type="number"
        min="0"
        max="16"
        step=".5"
        v-model="value"
        :class="`form-control form-control-sm text-center text-${
          isWeekend || isHoliday ? 'light' : 'primary'
        } bg-transparent p-1 no-spinners border-0`"
        :readonly="!canEdit"
        :placeholder="EHNumber"
        :disabled="!canEdit"
        @focusout="handleLostFocus"
      />
    </div>
  </div>
  <div class="col-12" @click="handleToggleEdit">
    <div class="input-group mb-3 moonGroup">
      <span
        class="input-group-text text-dark border-0 bg-transparent"
        id="basic-addon2"
        ><i class="fa-solid fa-moon"
      /></span>
      <input
        type="number"
        min="0"
        max="16"
        step=".5"
        v-model="nightlyValue"
        :class="`form-control form-control-sm text-center text-${
          isWeekend || isHoliday ? 'light' : 'primary'
        } bg-transparent p-1 no-spinners border-0`"
        :readonly="!canEdit"
        :placeholder="NightlyEHNumber"
        :disabled="!canEdit"
        @focusout="handleLostFocus"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CalendarDayInputs",
  data() {
    return {
      value: this.extraHour?.amount || 0,
      nightlyValue: this.extraHour?.nightlyAmount || 0,
    };
  },
  emits: ["newValueChanged", "newNightlyValueChanged"],
  props: [
    "handleToggleEdit",
    "canEdit",
    "isWeekend",
    "isHoliday",
    "handleLostFocus",
    "extraHour",
  ],
  computed: {
    EHNumber() {
      return this.extraHour?.amount.toFixed(1) ?? 0;
    },
    NightlyEHNumber() {
      return this.extraHour?.nightlyAmount.toFixed(1) ?? 0;
    },
  },
  watch: {
    extraHour() {
      this.value = this.extraHour.amount;
      this.nightlyValue = this.extraHour.nightlyAmount;
    },
    value() {
      this.$emit("newValueChanged", this.value);
    },
    nightlyValue() {
      this.$emit("newNightlyValueChanged", this.nightlyValue);
    },
  },
};
</script>

<style scoped>
.form-check {
  cursor: pointer;
  font-size: 12px;
  text-align: left;
}
.form-control {
  font-size: 28px;
  cursor: pointer;
}

.moonGroup .form-control {
  font-size: 22px;
}
</style>
