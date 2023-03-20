<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand text-light" to="/">Feriapp</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon text-light"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link active text-light"
              aria-current="page"
              to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/dayOff">Abono</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/vacation">Férias</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/license">Licença -Prêmio</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Justificativas</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/workers">
              Trabalhador
            </router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Procure alguma coisa"
            aria-label="Search"
          />
          <button class="btn btn-outline-light m-1" type="submit">
            Buscar
          </button>
          <button
            class="btn btn-outline-light m-1"
            type="submit"
            @click="logout"
          >
            <i class="fa-solid fa-power-off text-danger" alt="Logout" />
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: "AppBar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
}
</style>
