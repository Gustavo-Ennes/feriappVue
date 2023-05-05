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
import { Tooltip } from "bootstrap";

import JustificationModal from "./components/JustificationModal/JustificationModal.vue";
import LoadingFrame from "./components/LoadingFrame.vue";
import AppBar from "./components/AppBar.vue";
import GeneralToast from "./components/GeneralToast.vue";

export default {
  name: "app",
  mounted() {
    this.enableTooltipsEverywhere();
  },
  methods: {
    handleSearch(searchTerm: string): void {
      this.$router.push({ name: "search", params: { searchTerm } });
    },
    enableTooltipsEverywhere() {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        if (!(tooltipTriggerEl as any)._tooltip) {
          const tooltip = new Tooltip(tooltipTriggerEl);
          (tooltipTriggerEl as any)._tooltip = tooltip;
          (tooltipTriggerEl as HTMLElement).addEventListener("remove", () => {
            tooltip.dispose();
          });
          return tooltip;
        }
      });
    },
  },
  components: { LoadingFrame, AppBar, GeneralToast, JustificationModal },
};
</script>
