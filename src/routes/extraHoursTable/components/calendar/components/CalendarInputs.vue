<template>
  <div>
    <div class="col-12">
      <div class="input-group sunGroup">
        <span
          class="input-group-text text-warning border-0 bg-transparent"
          id="basic-addon1"
        >
          <i class="fa-regular fa-sun"
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
          :placeholder="EHNumber"
          @focusout="handleLostFocus"
        />
      </div>
    </div>
    <div class="col-12">
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
          :placeholder="NightlyEHNumber"
          @focusout="handleLostFocus"
        />
      </div>
    </div>
    <div class="col-12">
      <label class="form-label">Departamento</label>
      <select
        class="form-select"
        aria-label="department select"
        v-model="department"
        required
        :disabled="value === 0 && nightlyValue === 0"
        :readonly="value === 0 && nightlyValue === 0"
        @focusout="handleLostFocus"
      >
        <option
          v-for="department in departments"
          :key="(department as Department)._id"
          :value="(department as Department)"
        >
          {{ (department as Department).name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import type { Department } from "@/routes/departments/types";
import { capitalizeName } from "@/routes/utils";
import { isWeekend } from "date-fns";

export default {
  name: "CalendarDayInputs",
  data() {
    return {
      value: this.extraHour?.amount ?? 0,
      nightlyValue: this.extraHour?.nightlyAmount ?? 0,
      department: this.extraHour?.department || this.worker.department,
    };
  },
  emits: ["newValueChanged", "newNightlyValueChanged", "departmentChanged"],
  props: [
    "isWeekend",
    "isHoliday",
    "extraHour",
    "departments",
    "worker",
    "handleLostFocus",
  ],
  computed: {
    computedName() {
      return capitalizeName(this.worker.department?.name);
    },
    computedSelected() {
      return this.department._id === this.worker.department._id;
    },
    EHNumber() {
      return this.extraHour?.amount?.toFixed(1) ?? 0;
    },
    NightlyEHNumber() {
      return this.extraHour?.nightlyAmount?.toFixed(1) ?? 0;
    },
  },
  watch: {
    extraHour() {
      this.value = this.extraHour?.amount ?? 0;
      this.nightlyValue = this.extraHour?.nightlyAmount ?? 0;
      this.department = this.extraHour?.department ?? this.worker.department;
    },
    value() {
      this.$emit("newValueChanged", this.value);
    },
    nightlyValue() {
      this.$emit("newNightlyValueChanged", this.nightlyValue);
    },
    department() {
      this.$emit("departmentChanged", this.department);
    },
  },
};
</script>

<style scoped>
.form-check {
  cursor: pointer;
  font-size: 10px;
  text-align: left;
}

.form-control {
  font-size: 28px;
  cursor: pointer;
}

.moonGroup .form-control {
  font-size: 22px;
}

.form-label,
.form-select {
  font-size: 10px;
}
</style>
