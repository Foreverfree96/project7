<template>
  <div>
    <img
      class="group-img"
      src="../logos/icon-left-font.png"
      alt="groupomania-logo"
    />
    <header>
      <nav>
        <div class="btnFlexPosition">
          <router-link class="createPostBtn" to="/CreatePost"
            >Create Post</router-link
          >
          <router-link class="loginBtnPosition" to="/">Home</router-link>
          <router-link
            v-if="loggedIn"
            class="profBtn, loginBtnPosition"
            to="/profile"
            >Profile</router-link
          >
          <router-link class="loginBtnPosition" to="/login">Login</router-link>
          <router-link class="signupBtnPosition" to="/signup"
            >Signup</router-link
          >
        </div>
      </nav>
    </header>

    <router-view></router-view>

    <FooterComp msg="" />
  </div>
</template>

<script>
import FooterComp from "./components/FooterComp.vue";

// import SignupPage from "./views/SignupPage.vue";
// import LoginPage from "./views/LoginPage.vue";
import { ref } from "vue";

export default {
  data() {
    return {
      token: null,
      user: {},
    };
  },
  components: {
    FooterComp,
  },
  created() {
    this.token = localStorage.getItem("token");
    this.loggedIn = ref(this.token !== null);
  },
};

const token = localStorage.getItem("token");
const loggedIn = ref(token !== null);
console.log(loggedIn);
console.log(token);
</script>

<style>
@import "./assets/styles/main.css";
</style>
