<template>
  <AppBar v-if="$store.state.user" />
  <router-view />
  <LoadingFrame v-if="$store.state.loading" />
  <GeneralToast
    :title="$store.state.toast?.title"
    :text="$store.state.toast?.text"
    :type="$store.state.toast?.type"
    :icon="$store.state.toast?.icon"
    _id="myUniqueId"
  />
</template>

<script lang="ts">
import LoadingFrame from "./components/LoadingFrame.vue";
import AppBar from "./components/AppBar.vue";
import GeneralToast from "./components/GeneralToast.vue";
import { Tooltip } from "bootstrap";

export default {
  name: "app",
  mounted() {
    this.enableTooltipsEverywhere();
  },
  methods: {
    enableTooltipsEverywhere() {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl);
      });
    },
  },
  components: { LoadingFrame, AppBar, GeneralToast },
};
</script>
