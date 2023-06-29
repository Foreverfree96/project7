<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HomePage msg="Welcome to Your Vue.js App" />
  <FooterComp msg="footer" />
</template>

<script>
import HomePage from "./views/HomePage.vue";
import FooterComp from "./components/FooterComp.vue";

export default {
  name: "App",
  components: {
    FooterComp,
    HomePage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
