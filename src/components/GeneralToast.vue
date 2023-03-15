<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      :id="_id"
      :class="`toast ${type === 'info' ? 'bg-primary' : 'bg-danger'}`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <i
          :class="`fa-solid fa-${icon} mx-2 ${
            type === 'info' ? 'text-primary' : 'text-danger'
          }`"
        ></i>
        <strong
          :class="`me-auto ${type === 'info' ? 'text-primary' : 'text-danger'}`"
          >{{ title }}</strong
        >
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="closeToast"
        ></button>
      </div>
      <div class="toast-body text-light">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "GeneralToast",
  props: ["title", "text", "type", "_id", "icon"],
  methods: {
    closeToast() {
      const toast = document.getElementById(this._id);
      toast?.classList.remove("d-block");
      toast?.classList.add("d-none");

    },
  },
};
</script>
