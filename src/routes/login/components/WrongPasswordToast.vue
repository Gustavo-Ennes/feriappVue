<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      id="liveToast"
      class="toast bg-primary"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <i class="fa-solid fa-lock mx-2 text-danger"></i>
        <strong class="me-auto text-danger">Senha incorreta</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body text-light">A senha inserida está incorreta</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "WrongPasswordToast",
};
</script>
