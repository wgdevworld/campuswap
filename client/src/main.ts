import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import App from "./App.vue";
import "./style.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Requests from "./components/Requests.vue";
import Items from "./components/Items.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";

const routes = [
  { path: "/", component: Items },
  { path: "/requests", component: Requests },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(BootstrapVue as any)
  .use(BootstrapVueIcons as any)
  .use(router)
  .mount("#app");
