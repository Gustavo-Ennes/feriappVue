<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand text-light" href="#">Feriapp</a>
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
            <a class="nav-link active text-light" aria-current="page" href="#"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Abono</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Férias</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Licença-prêmio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Justificativas</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-light"
              href="#"
              @click="$router.push('/workers')"
              >Trabalhador</a
            >
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

<style lang="scss">
.navbar {
  width: 100%;
}
</style>
