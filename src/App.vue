<script lang="ts">
import LoadingFrame from "./components/LoadingFrame.vue";

export default {
  name: "app",
  components: { LoadingFrame },
};
</script>

<template>
  <router-view />
  <LoadingFrame v-if="$store.state.loading" />
</template>
