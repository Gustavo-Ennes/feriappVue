import type { User } from "firebase/auth";

import { createStore, Store } from "vuex";
import type { InjectionKey } from "vue";

import type { State, StoreComponents, ToastParams } from "./store.d";
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
      toast: undefined,
    };
  },
  mutations: {
    setToast(state: State, value: ToastParams) {
      state.toast = value;
    },
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
    logout({ commit }: StoreComponents) {
      commit("resetUser");
    },
    startLoading({ commit }: StoreComponents) {
      commit("setLoading", true);
    },
    stopLoading({ commit }: StoreComponents) {
      commit("setLoading", false);
    },
    showToast({ commit, state }: StoreComponents, toastParams: ToastParams) {
      commit("setToast", toastParams);
      const toastHTML = document.getElementById("myUniqueId");
      toastHTML?.classList.add("d-block");
      new Promise((resolve, _) => {
        setTimeout(() => {
          toastHTML?.classList.remove("d-block");
          resolve(true);
        }, toastParams?.timeout || 1500);
      });
    },
  },
  plugins: [vuexLocal.plugin],
});

export type { State };
export { store, key };
