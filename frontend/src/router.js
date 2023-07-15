import { createRouter, createWebHistory } from "vue-router";
// import Vue from "vue";

// Import your components here
import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";

// Vue.use(VueRouter);

// Define your routes
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/signup",
    component: SignupPage,
  },
];

// Create a new VueRouter instance with the routes
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
