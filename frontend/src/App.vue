<template>
  <div>
    <img src="../logos/icon-left-font.png" alt="groupomania-logo" />
    <header>
      <nav>
        <div class="btnFlexPosition">
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
// import HomePage from "./views/HomePage.vue";
import FooterComp from "./components/FooterComp.vue";
// import SignupPage from "./views/SignupPage.vue";
// import LoginPage from "./views/LoginPage.vue";

export default {
  name: "App",
  components: {
    // SignupPage,
    // HomePage,
    FooterComp,
    // LoginPage,
  },
};
</script>
<style>
@import "./assets/styles/main.css";
</style>
