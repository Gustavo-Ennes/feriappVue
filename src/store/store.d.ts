import type { User } from "firebase/auth";
import { Store } from "vuex";

export interface State {
  loading: boolean;
  user: User | null;
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
