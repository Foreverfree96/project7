<template>
  <div>
    <ul class="post-list">
      <li v-for="item in items" :key="item.id" class="post-card">
        <div class="post-header">
          <h3>{{ item.title }}</h3>
          <button @click="deletePost(item)">Delete</button>
        </div>
        <div class="post-content">
          <div v-if="item.imageUrl" class="post-image">
            <img :src="item.imageUrl" alt="Post Image" />
          </div>
          <p>{{ item.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      items: [],
      dataLoading: true,
      imageUrl: "http://localhost:3000/images/", // Change this to your actual image hosting URL
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      console.log("Fetching data...");
      const response = await axios.get("http://localhost:3000/api/posts");
      if (response.status === 200) {
        const posts = response.data;
        this.items = posts.map((post) => {
          return {
            ...post,
            imageUrl: `${post.imageUrl}`,
          };
        });
        console.log(this.items);
        this.dataLoading = false;
      } else {
        console.error("Error fetching data:", response.statusText);
        this.dataLoading = false;
      }
    },
    async deletePost(item) {
      const url = `http://localhost:3000/api/posts/${item.id}`;
      // console.log(localStorage.getItem("token"));
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      console.log(url);
      console.log(headers);
      try {
        const response = await axios.delete(url, {
          headers,
        });
        console.log("Delete response:", response);
        if (response.status === 200) {
          alert("Post deleted successfully");
          this.fetchData();
        } else {
          // Handle other response statuses if required
        }
      } catch (error) {
        if (error.response) {
          console.error("Error deleting post:", error);
        } else {
          console.error("Error deleting post:", error);
        }
      }
    },
  },
});
</script>

<style>
@import "../assets/styles/main.css";
</style>
