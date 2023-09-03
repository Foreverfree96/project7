<template>
  <div>
    <div class="profile-container">
      <h2>Your Profile</h2>
      <div class="profile-content">
        <!-- Display the number of posts created by the current user -->
        <p v-if="currentUserPosts.length > 0">
          You have created {{ currentUserPosts.length }} posts.
        </p>
        <!-- Display a message if the current user hasn't created any posts yet -->
        <p v-else>You haven't created any posts yet.</p>
        <!-- Display user details if available -->
        <p v-if="userDetails">Username: {{ userDetails.username }}</p>
        <p v-if="userDetails">Email: {{ userDetails.email }}</p>
        <!-- Button to delete the user account -->
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
    // Get the current user ID from localStorage
    currentUser() {
      return JSON.parse(localStorage.getItem("userId"));
    },
    // Filter posts to get only those created by the current user
    currentUserPosts() {
      return this.userPosts.filter((post) => post.userId === this.currentUser);
    },
  },
  data() {
    return {
      userPosts: [], // Initialize the userPosts array
      userDetails: null, // Initialize userDetails as null
    };
  },
  created() {
    // Fetch user posts and details when the component is created
    this.fetchUserPosts();
    this.fetchUserDetails(); // Fetch user details along with posts
  },
  methods: {
    async fetchUserPosts() {
      try {
        // Fetch posts created by the current user
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
        // Fetch user details based on the current user ID
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
        // Remove user-related data from localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        // Redirect to the homepage
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
