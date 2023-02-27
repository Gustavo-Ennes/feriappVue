<script lang="ts">
import LoadingFrame from "./components/LoadingFrame.vue";
import AppBar from "./components/AppBar.vue";

export default {
  name: "app",
  components: { LoadingFrame, AppBar },
};
</script>

<template>
  <AppBar v-if="$store.state.user" />
  <router-view />
  <LoadingFrame v-if="$store.state.loading" />
</template>
