<template>
  <div class="signupFlex">
    <form class="form-sizing" @submit.prevent="submitForm">
      <h2 class="text-spacing">{{ isLogin ? "Login" : "Sign Up" }}</h2>
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
      <div class="btn-container">
        <!-- Button to submit the form (either Login or Sign Up) -->
        <button class="action-btn" type="submit">
          {{ isLogin ? "Login" : "Sign Up" }}
        </button>
        <!-- Link to toggle between Login and Sign Up forms -->
        <router-link id="move-text" class="action-btn" to="/signup">
          Switch to Sign Up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLogin: true, // Set to true to display the login form initially
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.isLogin) {
        // Handle login logic
        axios
          .post("http://localhost:3000/api/auth/login", this.form)
          .then((response) => {
            // Handle successful login
            console.log("Login successful", response.data);
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem(
              "username",
              JSON.stringify(response.data.username)
            );
            localStorage.setItem(
              "userId",
              JSON.stringify(response.data.userId)
            );

            // Reset form fields
            this.form.username = "";
            this.form.email = "";
            this.form.password = "";

            if (response.data.token) {
              this.$router.push("/");
            }
          })
          .catch((error) => {
            // Handle login error
            console.error("Login error", error);
          });
      } else {
        // Handle signup logic
        axios
          .post("http://localhost:3000/api/auth/signup", this.form)
          .then((response) => {
            // Handle successful signup
            console.log("Registered Successfully", response.data);

            // Reset form fields
            this.form.username = "";
            this.form.email = "";
            this.form.password = "";

            this.$router.push("/login"); // Redirect to the login page after successful signup
          })
          .catch((error) => {
            // Handle signup error
            console.error("Signup error", error);
          });
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin; // Switch between login and signup forms
    },
  },
};
</script>
