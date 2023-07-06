import HomePage from "./views/HomePage.vue";
import SignupPage from "./views/SignupPage.vue";
import LoginPage from "./views/LoginPage.vue";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// Define your routes
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/signup",
    component: SignupPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
];

// Create a new VueRouter instance with the routes
const router = new VueRouter({
  routes,
});

// Mount the Vue instance with the router
new Vue({
  router,
}).$mount("#app");
