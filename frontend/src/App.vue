<template>
  <div>
    <!-- Groupomania logo -->
    <img
      class="group-img"
      src="../logos/icon-left-font.png"
      alt="groupomania-logo"
    />
    <header>
      <nav>
        <!-- Navigation links -->
        <div class="btnFlexPosition">
          <!-- Link to create a post -->
          <router-link class="createPostBtn" to="/CreatePost"
            >Create Post</router-link
          >
          <!-- Link to the home page -->
          <router-link class="loginBtnPosition" to="/">Home</router-link>
          <!-- Link to the profile page (visible if logged in) -->
          <router-link
            v-if="loggedIn"
            class="profBtn, loginBtnPosition"
            to="/profile"
            >Profile</router-link
          >
          <!-- Link to the login page -->
          <router-link class="loginBtnPosition" to="/login">Login</router-link>
          <!-- Link to the signup page -->
          <router-link class="signupBtnPosition" to="/signup"
            >Signup</router-link
          >
        </div>
      </nav>
    </header>

    <!-- Display different views based on the route -->
    <router-view></router-view>

    <!-- Include the FooterComp component with an empty message prop -->
    <FooterComp msg="" />
  </div>
</template>

<script>
import FooterComp from "./components/FooterComp.vue";
import { ref } from "vue";

export default {
  data() {
    return {
      // Initialize data properties
      token: null, // Store the user's token
      user: {}, // Store user information (not used in this component)
    };
  },
  components: {
    FooterComp, // Include the FooterComp component
  },
  created() {
    // Lifecycle hook: executed when the component is created
    // Check if a token exists in localStorage
    this.token = localStorage.getItem("token");
    // Create a ref called 'loggedIn' based on the token's presence
    this.loggedIn = ref(this.token !== null);
  },
};

// Additional code (declarations and console logs)
const token = localStorage.getItem("token");
const loggedIn = ref(token !== null);
console.log(loggedIn);
console.log(token);
</script>

<style>
@import "./assets/styles/main.css";
</style>
