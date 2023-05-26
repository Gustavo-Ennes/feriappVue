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
        <div class="col-12" @click="handleToggleEdit">
          <input
            type="number"
            min="0"
            max="16"
            step=".5"
            v-model="newValue"
            :class="`form-control form-control-lg text-center text-${
              isWeekend || isHoliday ? 'light' : 'primary'
            } bg-transparent p-1 no-spinners border-0`"
            :readonly="!canEdit"
            :placeholder="extraHourNumber"
            :disabled="!canEdit"
            @focusout="handleLostFocus"
          />
        </div>
        <div class="col-12" v-if="!isWeekend">
          <div class="form-check">
            <input
              class="form-check-input pl-1"
              type="checkbox"
              id="flexCheckDefault"
              v-model="isHoliday"
              @onSelect="isHoliday = !isHoliday"
            />
            <label class="form-check-label" for="flexCheckDefault">
              <small
                :class="`text-${isWeekend || isHoliday ? 'light' : 'primary'}`"
                >feriado</small
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format, isSameMonth, isSameYear } from "date-fns";
import type {
  CalendarDayData,
  CalendarHolidayStorage,
  CalendarHolidayMonth,
} from "../types";
import { includes, without } from "ramda";

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
  },
  emits: ["addToModified"],
  data(): CalendarDayData {
    return {
      canEdit: false,
      newValue: this.extraHour?.amount ?? Number(0).toFixed(1),
      isHoliday: this.checkIsHoliday(),
    };
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
    checkIsHoliday() {
      const actualMonthReference = this.getHolidayReferenceMonth();
      return actualMonthReference && this.day
        ? includes(this.day.getDate(), actualMonthReference.days)
        : false;
    },
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
          amount: this.newValue,
        };
        this.$emit("addToModified", payload);
        this.toggleEdit();
      }
    },
    getHolidayMonths(): CalendarHolidayStorage {
      return JSON.parse(
        localStorage.getItem("calendarHolidays") ?? '{"months": []}'
      );
    },
    getHolidayReferenceMonth(): CalendarHolidayMonth | void {
      return this.getHolidayMonths().months.filter(
        ({ reference }: CalendarHolidayMonth) =>
          isSameMonth(new Date(reference), this.day as Date) &&
          isSameYear(new Date(reference), this.day as Date)
      )?.[0];
    },
    writeHolidayMonths(months: CalendarHolidayMonth[]) {
      localStorage.setItem("calendarHolidays", JSON.stringify({ months }));
    },
    addToLocalStorage() {
      const { months } = this.getHolidayMonths();
      const thisReferenceMonth = this.getHolidayReferenceMonth();
      const newMonths = without([thisReferenceMonth], months);
      const dayNumber = this.day?.getDate() ?? 0;

      if (
        thisReferenceMonth &&
        dayNumber &&
        !(dayNumber in thisReferenceMonth.days)
      ) {
        thisReferenceMonth.days.push(dayNumber);
        newMonths.push(thisReferenceMonth);
      } else if (!thisReferenceMonth && dayNumber) {
        newMonths.push({
          reference: this.day?.toISOString() as string,
          days: [dayNumber],
        });
      }
      this.writeHolidayMonths(newMonths);
    },
    removeFromLocalStorage() {
      const referenceMonth = this.getHolidayReferenceMonth();
      const { months } = this.getHolidayMonths();
      if (!referenceMonth) return;
      else {
        const newMonths = without([referenceMonth], months);
        referenceMonth.days.splice(
          referenceMonth.days.indexOf(this.day?.getDate() as number),
          1
        );
        if (referenceMonth.days) {
          newMonths.push(referenceMonth);
        }
        this.writeHolidayMonths(newMonths);
      }
    },
  },
  watch: {
    extraHour() {
      this.newValue = this.extraHour?.amount ?? Number(0).toFixed(1);
      this.isHoliday=  this.checkIsHoliday();
    },
    isHoliday() {
      if (this.isHoliday) {
        this.addToLocalStorage();
      } else {
        this.removeFromLocalStorage();
      }
    },
  },
};
</script>

<style scoped>
.dayItem {
  height: 160px;
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
.form-check {
  cursor: pointer;
  font-size: 12px;
  text-align: left;
}
.form-control {
  font-size: 32px;
  cursor: pointer;
}
</style>
