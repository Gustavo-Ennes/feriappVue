<template>
  <div class="background-img">
    <div class="blur">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="my-4 text-primary">FERIAPP</h1>
        </div>
        <div class="col-12">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title mb-3 text-center">Login</h5>
              <div class="mb-2">
                <label for="exampleFormControlInput1" class="form-label"
                  >Email</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="emailInpyt"
                  placeholder="your-email@example.com here"
                  required
                  v-model="email"
                />
              </div>
              <div class="mb-2">
                <label for="exampleFormControlInput1" class="form-label"
                  >Senha</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="passwordInput"
                  placeholder="Your password here"
                  required
                  v-model="password"
                />
              </div>
              <div class="mt-4 text-center">
                <button @click="login" class="btn btn-primary my-2">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { login as loginUser } from "../../firebase/firebase";
import LoadingFrame from "../../components/LoadingFrame.vue";
import GeneralToast from "../../components/GeneralToast.vue";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    openToast() {
      this.$store.dispatch("showToast", {
        title: "Usuário ou senha incorreta",
        type: "danger",
        text: "A infomação de usuário e/ou senha está incorreta. Verifique seu CAPS LOCK e tente novamente.",
        icon: "lock",
      });
    },
    async login(): Promise<void> {
      this.$store.dispatch("startLoading");
      await loginUser(this.email, this.password);
      this.$store.dispatch("stopLoading");

      if (this.$store.state.user) {
        this.$router.push("/");
      } else {
        this.openToast();
      }
    },
  },
  components: { LoadingFrame, GeneralToast },
};
</script>

<style lang="scss">
.row {
  display: block;
}
.background-img {
  background-image: url(../../assets/loginCover.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.blur {
  background-color: rgba(206, 206, 206, 0.801);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.card {
  margin-bottom: 100px;
}
</style>
