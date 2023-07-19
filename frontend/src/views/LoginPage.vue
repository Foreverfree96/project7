<template>
  <div class="signupFlex">
    <form class="form-sizing" @submit.prevent="submitForm">
      <h2 class="text-spacing">Login</h2>
      <div class="form-row">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>

      <div class="form-row">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-row">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div class="btn-flex">
        <button class="login-Btn" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:3000/api/auth/login", this.form)
        .then((response) => {
          // Handle successful signup
          console.log("Login successful", response.data);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          console.log(localStorage.getItem("token"));
          // Reset form fields
          this.form.username = "";
          this.form.email = "";
          this.form.password = "";

          if (response.data.token) {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          // Handle signup error
          console.error("login error", error);
        });
    },
  },
};
</script>
