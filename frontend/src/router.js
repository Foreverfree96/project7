import { createRouter, createWebHistory } from "vue-router";
// import Vue from "vue";

// Import your components here
import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";
import ProfilePage from "./views/ProfilePage.vue";
import CreatePost from "./views/CreatePost.vue";

// Vue.use(VueRouter);

// Define your routes
const routes = [
  {
    path: "/HomePage",
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
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/createpost",
    component: CreatePost,
  },
];

// Create a new VueRouter instance with the routes
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
