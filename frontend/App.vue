<template>
  <div id="app">
    <Header></Header>
    <Nav></Nav>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/footer.vue";

export default {
  components: {
    Header,
    Nav,
    Footer,
  },
};
</script>

<style>
/* CSS styles for App.vue */
</style>
