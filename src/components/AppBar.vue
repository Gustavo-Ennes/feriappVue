<template>
  <nav class="navbar navbar-expand-lg bg-primary" id="navbar">
    <div class="container-fluid">
      <router-link class="navbar-brand text-light" to="/" @click="forceToggle"
        >Feriapp</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="forceToggle"
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
            <router-link
              class="nav-link text-light"
              to="/dayOff"
              @click="forceToggle"
              >Abono</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/vacation"
              @click="forceToggle"
              >Férias</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/license"
              @click="forceToggle"
              >Licença -Prêmio</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Justificativas</a>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/workers"
              @click="forceToggle"
            >
              Trabalhador
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/departments"
              @click="forceToggle"
            >
              Setores
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
import { animateCSS } from "@/animate.css/animate.css";

export default {
  name: "AppBar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    async forceToggle(): Promise<void> {
      const html = document.getElementById("navbarSupportedContent");
      if (html?.classList.contains("show")) {
        html.classList.remove("show");
      } else {
        html?.classList.add("show");
        await animateCSS({
          elementId: "navbarSupportedContent",
          animation: "slideInLeft",
          velocity: "faster",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  a:hover {
    color: #dd0 !important;
  }
}
</style>
