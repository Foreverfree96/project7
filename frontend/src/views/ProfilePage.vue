<template>
  <div>
    <div class="profile-container">
      <h2>Your Profile</h2>
      <div class="profile-content">
        <p v-if="currentUserPosts.length > 0">
          You have created {{ currentUserPosts.length }} posts.
        </p>
        <p v-else>You haven't created any posts yet.</p>
        <p v-if="userDetails">Username: {{ userDetails.username }}</p>
        <p v-if="userDetails">Email: {{ userDetails.email }}</p>
        <button @click="deleteCurrentUser">Delete Account</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    currentUser() {
      return JSON.parse(localStorage.getItem("userId"));
    },
    currentUserPosts() {
      return this.userPosts.filter((post) => post.userId === this.currentUser);
    },
  },
  data() {
    return {
      userPosts: [],
      userDetails: null,
    };
  },
  created() {
    this.fetchUserPosts();
    this.fetchUserDetails(); // Fetch user details along with posts
  },
  methods: {
    async fetchUserPosts() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts?userId=${this.currentUser}`
        );
        this.userPosts = response.data;
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    },
    async fetchUserDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${this.currentUser}`
        );
        console.log("API Response:", response.data);
        this.userDetails = { ...response.data };
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    },

    async deleteCurrentUser() {
      try {
        // Delete the current user and their posts
        await this.deleteUserPosts(); // Call the deleteUserPosts method first
        await axios.delete(
          `http://localhost:3000/api/user/deleteUser/${this.currentUser}`
        );
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        this.$router.push("/");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },

    async deleteUserPosts() {
      try {
        // Delete all posts associated with the current user
        for (const post of this.currentUserPosts) {
          await axios.delete(`http://localhost:3000/api/posts/${post.id}`);
        }
      } catch (error) {
        console.error("Error deleting user posts:", error);
      }
    },
  },
});
</script>

<style>
@import "../assets/styles/main.css";
</style>
