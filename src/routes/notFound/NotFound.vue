<template>
  <div class="main">
    <div class="row">
      <div class="col-12">
        <h1><i class="fa-regular fa-circle-xmark my-5 text-danger"></i></h1>
      </div>
      <div class="col-12">
        <h2>Not found</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NotFound",
  created() {
    setTimeout(() => this.$router.push("/login"), 3000);
  },
};
</script>

<style lang="scss">
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  i {
    font-size: 2.5em;
  }

  h2 {
    font-size: 1.2em;
  }
}
</style>
