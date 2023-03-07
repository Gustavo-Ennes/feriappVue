<script lang="ts">
import LoadingFrame from "./components/LoadingFrame.vue";
import AppBar from "./components/AppBar.vue";
import GeneralToast from "./components/GeneralToast.vue";

export default {
  name: "app",
  components: { LoadingFrame, AppBar, GeneralToast },
};
</script>

<template>
  <AppBar v-if="$store.state.user" />
  <router-view />
  <LoadingFrame v-if="$store.state.loading" />
  <GeneralToast
    :title="$store.state.toast?.title"
    :text="$store.state.toast?.text"
    :type="$store.state.toast?.type"
    _id="myUniqueId"
  />
</template>
