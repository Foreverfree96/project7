<template>
  <div>
    <div v-if="dataLoading">Loading...</div>
    <div v-else>
      <h2 class="text-center">Welcome, {{ userProfile.username }}</h2>
      <ul v-if="items.length">
        <li v-for="item in items" :key="item.id">{{ item.title }}</li>
      </ul>

      <CreatePost v-if="showCreatePostForm" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "./CreatePost.vue";

export default {
  components: {
    CreatePost,
  },
  data() {
    return {
      items: [],
      dataLoading: true,
      userProfile: {},
      showCreatePostForm: false, // Add a new data property to control the form visibility
    };
  },
  mounted() {
    // Fetch user profile data and other data from the backend when the component is mounted
    this.fetchUserProfile();
    this.fetchData();
  },
  methods: {
    toggleCreatePostForm() {
      this.showCreatePostForm = !this.showCreatePostForm;
    },
    fetchUserProfile() {
      // Get the authentication token from localStorage
      const token = JSON.parse(localStorage.getItem("token"));

      // Make a GET request to fetch user profile data with the authentication token
      axios
        .get("http://localhost:3000/api/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.userProfile = response.data;
        })
        .catch((error) => {
          console.error("Failed to fetch user profile", error);
        });
    },
    fetchData() {
      axios
        .get("http://localhost:3000/api/getUsers")
        .then((response) => {
          this.items = response.data;
          this.dataLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.dataLoading = false;
        });
    },
  },
};
</script>

<style></style>
