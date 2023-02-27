import type { User } from "firebase/auth";

import { createStore, Store } from "vuex";
import type { InjectionKey } from "vue";

import type { State, StoreComponents } from "./store.d";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
});

const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state(): State {
    return {
      loading: false,
      user: null,
    };
  },
  mutations: {
    setLoading(state: State, value: boolean) {
      state.loading = value;
    },
    setUser(state: State, user: User): void {
      state.user = user;
    },
    resetUser(state: State): void {
      state.user = null;
    },
  },
  actions: {
    login({ commit }: StoreComponents, user: User) {
      commit("setUser", user);
    },
    logout({ commit }: StoreComponents, user: User) {
      commit("resetUser");
    },
    startLoading({ commit }: StoreComponents) {
      commit("setLoading", true);
    },
    stopLoading({ commit }: StoreComponents) {
      commit("setLoading", false);
    },
  },
  plugins: [vuexLocal.plugin],
});

export type { State };
export { store, key };
