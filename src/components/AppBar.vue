<template>
  <nav class="navbar navbar-expand-lg bg-primary" id="navbar">
    <div class="container-fluid">
      <router-link class="navbar-brand text-light" to="/" @click="forceClose"
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
              @click="forceClose"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/dayOff"
              @click="forceClose"
              >Abono</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/vacation"
              @click="forceClose"
              >Férias</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/license"
              @click="forceClose"
              >Licença -Prêmio</router-link
            >
          </li>
          <li class="nav-item">
            <span
              class="nav-link text-light"
              @click="$store.dispatch('openJustificationModal')"
              >Justificativas</span
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/workers"
              @click="forceClose"
            >
              Trabalhador
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-light"
              to="/departments"
              @click="forceClose"
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
          <button class="btn btn-outline-light m-1" type="button">
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
  mounted() {
    this.navEl = document.getElementById("navbarSupportedContent");
  },
  data(): { navEl: HTMLElement | null } {
    return {
      navEl: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    forceClose(): void {
      this.navEl?.classList.remove("show");
    },
    async forceToggle(): Promise<void> {
      if (this.navEl?.classList.contains("show")) {
        this.forceClose();
      } else {
        this.navEl?.classList.add("show");
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
span {
  cursor: pointer;
  &:hover {
    color: #dd0 !important;
  }
}
.navbar {
  width: 100%;
  a:hover {
    color: #dd0 !important;
  }
}
</style>
