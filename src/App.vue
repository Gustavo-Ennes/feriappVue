<template>
  <AppBar v-if="$store.state.user" @search-requested="handleSearch" />
  <router-view />
  <LoadingFrame v-if="$store.state.loading" />
  <JustificationModal />
  <GeneralToast
    :title="$store.state.toast?.title"
    :text="$store.state.toast?.text"
    :type="$store.state.toast?.type"
    :icon="$store.state.toast?.icon"
    _id="myUniqueId"
  />
</template>

<script lang="ts">
import { Tooltip, Popover } from "bootstrap";

import JustificationModal from "./components/JustificationModal/JustificationModal.vue";
import LoadingFrame from "./components/LoadingFrame/index.vue";
import AppBar from "./components/AppBar.vue";
import GeneralToast from "./components/GeneralToast.vue";

export default {
  name: "app",
  mounted() {
    this.enableTooltipsEverywhere();
    this.enablePopoversEverywhere();
  },
  methods: {
    handleSearch(searchTerm: string): void {
      this.$router.push({ name: "search", params: { searchTerm } });
    },
    enablePopoversEverywhere() {
      var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      );
      popoverTriggerList.map(function (popoverTriggerEl) {
        return new Popover(popoverTriggerEl, { container: "body" });
      });
    },
    enableTooltipsEverywhere() {
      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl);
      });
    }
  },
  components: { LoadingFrame, AppBar, GeneralToast, JustificationModal }
};
</script>
