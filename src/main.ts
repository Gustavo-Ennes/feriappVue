import { createApp } from "vue";
import "animate.css";

import "../assets/app.scss";
import { router } from "./router/router";
import AppVue from "./App.vue";
import { store, key } from "./store/store";

// 5. Create and mount the root instance.
const app = createApp(AppVue);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);
app.use(store, key);

app.mount("#app");
