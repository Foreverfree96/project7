<template>
  <div class="signupFlex">
    <form class="form-sizing" @submit.prevent="submitForm">
      <h2 class="text-spacing">Sign Up</h2>
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
        <button class="signup-Btn" type="submit">Sign-up</button>
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
        .post("http://localhost:3000/api/auth/signup", this.form)
        .then((response) => {
          // Handle successful signup
          console.log("Registered Successfully", response.data);
          // Reset form fields
          this.form.username = "";
          this.form.email = "";
          this.form.password = "";
        })
        .catch((error) => {
          // Handle signup error
          console.error("Signup error", error);
        });
    },
  },
};
</script>
