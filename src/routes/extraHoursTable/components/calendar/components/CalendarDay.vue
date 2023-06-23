<template>
  <div
    :class="`card text-primary bg-light dayItem border-secondary ${
      isHoliday || isWeekend ? 'isHoliday' : ''
    }`"
    :hidden="!day"
  >
    <div class="card-body text-center">
      <div class="row justify-content-center align-items-center">
        <div class="col-12">
          <p
            :id="dayNumberId"
            :class="`h5 bg-${
              isWeekend || isHoliday ? 'light' : 'primary'
            } text-${isWeekend || isHoliday ? 'danger' : 'light'} rounded`"
          >
            {{ day?.getDate() }}
          </p>
        </div>
        <CalendarInputs
          :canEdit="canEdit"
          :extraHour="extraHour"
          :handleLostFocus="handleLostFocus"
          :handleToggleEdit="handleToggleEdit"
          :isHoliday="isHoliday"
          :isWeekend="isWeekend"
          :departments="departments"
          :worker="worker"
          @new-value-changed="(newvalue: number) => (newValue = newvalue)"
          @new-nightly-value-changed="
            (newvalue: number) => (newNightlyValue = newvalue)
          "
          @department-changed="(newvalue: Department) => newDepartment = newvalue"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format, isWeekend } from "date-fns";

import CalendarInputs from "./CalendarInputs.vue";
import type { CalendarDayData } from "../types";
import { includes } from "ramda";
import type { Department } from "@/routes/departments/types";
import {
  checkIsHoliday,
} from "@/routes/extraHoursTable/utils";

export default {
  name: "ExtraHourCalendarDay",
  props: {
    extraHour: {
      type: Object,
    },
    day: {
      type: Date,
    },
    worker: {
      type: Object,
      default: null,
    },
    departments: {
      type: Array<Department>,
      default: [],
    },
  },
  emits: ["addToModified"],
  data(): CalendarDayData {
    return {
      canEdit: false,
      newValue: undefined,
      isHoliday: undefined,
      newNightlyValue: undefined,
      newDepartment: undefined,
    };
  },
  mounted() {
    setInterval(() => {
      if (this.day) {
        console.log("passei aqui");
        this.isHoliday = checkIsHoliday({ day: this.day });
      }
    }, 500);
  },
  computed: {
    isWeekend() {
      return this.day
        ? includes(format(this.day as Date, "EEEE"), ["Saturday", "Sunday"])
        : false;
    },
    footerId() {
      return `day-${this.day?.getDate()}-${this.extraHourNumber}`;
    },
    dayNumberId() {
      return `day-number-${this.day?.getDate()}`;
    },
    extraHourNumber() {
      return this.extraHour?.amount.toFixed(1) ?? 0;
    },
    reference() {
      return `day${this.day?.getDate()}`;
    },
  },
  methods: {
    toggleEdit() {
      this.canEdit = !this.canEdit;
    },
    handleToggleEdit() {
      if (!this.canEdit) this.toggleEdit();
    },
    handleLostFocus() {
      if (this.canEdit) {
        const payload = {
          _id: this.extraHour?._id ?? undefined,
          worker: this.extraHour?.worker._id ?? this.worker._id,
          reference: this.extraHour?.day ?? this.day,
          amount: Number(this.newValue),
          department: this.newDepartment?._id,
          nightlyAmount: Number(this.newNightlyValue),
        };
        this.$emit("addToModified", payload);
        this.toggleEdit();
      }
    },
  },
  watch: {
    day() {
      if (this.day) this.isHoliday = checkIsHoliday({ day: this.day });
    },
  },
  components: { CalendarInputs },
};
</script>

<style scoped>
z.dayItem {
  height: 250px;
  border-radius: 15px;
  box-shadow: 1px 1px 12px 1px rgba(58, 58, 58, 0.3);
  overflow: hidden;
}
.dayItem.invalidDay {
  border-radius: 15px;
  box-shadow: 1px 1px 22px 1px rgba(209, 47, 47, 0.3);
  overflow: hidden;
}
.dayItem:hover {
  box-shadow: 1px 1px 8px 1px rgb(128, 128, 128);
  border: 1px solid rgba(131, 131, 255, 0.3);
}
.dayItemHeader {
  color: blue;
  font-size: 20px;
  padding: 5px;
  background-color: #ccf;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  height: 20%;
}
.dayItemBody {
  height: 60%;
  width: 100%;
  text-align: center;
  font-size: 30px;
}
.invalidDay > .dayItemBody {
  color: #888;
}
.dayItemFooter {
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.dayItemFooter:hover {
  cursor: pointer;
}
.isHoliday {
  background-color: #e64444 !important;
}
.form-control {
  font-size: 28px;
  cursor: pointer;
}
.moonGroup .form-control {
  font-size: 22px;
}

.form-check,
.form-check-label small {
  cursor: pointer;
  font-size: 10px !important;
  text-align: left;
}
small {
  margin-top: 10px;
}
</style>
