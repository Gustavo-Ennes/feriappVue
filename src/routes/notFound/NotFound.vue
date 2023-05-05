<template>
  <div class="main">
    <div class="row">
      <div class="col-12">
        <h1><i class="fa-regular fa-circle-xmark my-5 text-danger"></i></h1>
      </div>
      <div class="col-12">
        <h2>Não há nada aqui.</h2>
        <small v-if="timeout > 0"
          >Você será redirecionado em {{ timeout }} segundo{{
            `${timeout > 1 ? "s" : ""}`
          }}</small
        ><small v-else>Nos vemos na página principal...</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NotFound",
  data() {
    return {
      timeout: 3,
    };
  },
  created() {
    this.setOneSecTimeout();
  },
  watch: {
    timeout() {
      if (this.timeout === 0) {
        this.$router.push("/");
      } else {
        this.setOneSecTimeout();
      }
    },
  },
  methods: {
    setOneSecTimeout() {
      setTimeout(() => --this.timeout, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
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
