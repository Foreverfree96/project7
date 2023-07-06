<template>
  <img src="../logos/icon-left-font.png" alt="groupomania-logo" />
  <SignupPage class="signupFlex" msg="Signup" />
  <HomePage msg="Welcome to Your Vue.js App" />
  <FooterComp msg="" />
</template>

<script>
import HomePage from "./views/HomePage.vue";
import FooterComp from "./components/FooterComp.vue";
import SignupPage from "./views/SignupPage.vue";
import LoginPage from "./views/LoginPage.vue";

export default {
  name: "App",
  components: {
    SignupPage,
    HomePage,
    FooterComp,
    LoginPage,
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

.signupFlex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-sizing {
  font-weight: 300;
  font-size: 26px;
}
.text-spacing {
  display: block;
}
img #app {
  align-items: center;
  justify-content: center;
  display: flex;
}
img {
  height: 500px;
  margin-top: -200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-flex {
  margin-top: 10px;
  justify-content: space-between;
  display: flex;
}
.form-row {
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.signup-Btn,
.login-Btn {
  font-weight: 300;
  margin-top: 10px;
  font-size: 20px;
}
/* MEDIA QUERIES */

@media (max-width: 900px) {
  .signupFlex {
    flex-wrap: wrap;
  }

  .form-row {
    flex-basis: 100%;
  }

  .btn-flex {
    flex-direction: column;
    align-items: center;
  }
}
/* MEDIA QUERIES */
</style>
