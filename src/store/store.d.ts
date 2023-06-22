import type { User } from "firebase/auth";
import { Store } from "vuex";
import { Modal } from "bootstrap";

import type { ExtraHourWorker } from "@/routes/extraHoursTable/types";

export interface ToastParams {
  text: string;
  title: string;
  type: "info" | "danger";
  timeout?: number;
  icon?: string;
};

type CalendarTemp = {
  worker?: string,
  reference?: string,
}
export interface State {
  loading: boolean;
  user: User | null;
  toast?: ToastParams;
  justificationModal?: Modal;
  calendarTemp?: CalendarTemp
}
export interface StoreComponents {
  state: State;
  commit: (where: string, what?: any) => void;
}

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
