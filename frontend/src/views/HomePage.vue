<template>
  <div>
    <div v-if="dataLoading">Loading...</div>
    <div v-else>
      <ul v-if="items.length">
        <li v-for="item in items" :key="item.id">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
          <CreatePost v-if="item.userId" :userId="item.userId" />

          <!-- You can add more information here as needed -->
        </li>
      </ul>

      <!-- <CreatePost :userId="user.id" /> -->
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
      postData: {
        title: "",
        content: "",
        image: null,
        userId: this.user.id, // Use this.user.id instead of this.userId
      },
      items: [],
      dataLoading: true,
      user: {}, // Initialize user as an empty object
    };
  },
  mounted() {
    this.fetchData();
    console.log("User data from local storage:", this.user);
    this.token = JSON.parse(localStorage.getItem("token"));
    this.user.id = parseInt(this.user.id, 10);
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    fetchData() {
      console.log("Fetching data...");
      axios
        .get("http://localhost:3000/api/posts") // Update the URL to the correct endpoint for fetching posts
        .then((response) => {
          this.items = response.data;
          this.dataLoading = false;
        })
        .catch((error) => {
          console.error(error);
          console.error("Error fetching data:", error);
          this.dataLoading = false;
        });
    },
  },
};
</script>

<style></style>
