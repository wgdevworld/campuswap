import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import App from "./App.vue";
import "./style.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Requests from "./components/Requests.vue";
import Items from "./components/Items.vue";

const routes = [
  { path: "/", component: Items },
  { path: "/requests", component: Requests },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(BootstrapVue)
  .use(BootstrapVueIcons)
  .use(router)
  .mount("#app");
