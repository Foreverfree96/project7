// Import necessary functions from Vue Router
import { createRouter, createWebHistory } from "vue-router";

// Import your components here
import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";
import ProfilePage from "./views/ProfilePage.vue";
import CreatePost from "./views/CreatePost.vue";
import CardDetailPage from "./views/CardDetailPage.vue";

// Define your routes
const routes = [
  {
    name: "post", // Route name
    path: "/post/:id", // Route path with a dynamic parameter ":id"
    component: CardDetailPage, // Component to render for this route
    props: true, // Pass route parameters as props to the component
  },
  {
    path: "/", // Root route
    name: "home", // Route name
    component: HomePage, // Component to render for the home route
  },
  {
    path: "/login", // Login route
    component: LoginPage, // Component to render for the login route
  },
  {
    path: "/signup", // Signup route
    component: SignupPage, // Component to render for the signup route
  },
  {
    path: "/profile", // Profile route
    component: ProfilePage, // Component to render for the profile route
  },
  {
    path: "/createpost", // Create post route
    component: CreatePost, // Component to render for the create post route
  },
];

// Create a new VueRouter instance with the defined routes and history mode
const router = createRouter({
  history: createWebHistory(),
  routes, // Pass the routes to the router
});

// Export the router for use in the Vue application
export default router;
