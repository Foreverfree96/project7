<template>
  <div>
    <img src="../logos/icon-left-font.png" alt="groupomania-logo" />
    <header>
      <nav>
        <div class="btnFlexPosition">
          <router-link class="createPostBtn" to="/CreatePost"
            >Create Post</router-link
          >
          <router-link class="loginBtnPosition" to="/HomePage"
            >Home</router-link
          >
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      token: null,
      loggedIn: null,
    };
  },
  components: {
    FooterComp,
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.loggedIn = ref(this.token);
    console.log(this.loggedIn);
    console.log(this.token);
  },
});

const token = localStorage.getItem("token");
const loggedIn = ref(token);
console.log(loggedIn);
console.log(token);
</script>
<style>
@import "./assets/styles/main.css";
</style>
