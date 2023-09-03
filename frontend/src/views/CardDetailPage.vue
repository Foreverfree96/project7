<template>
  <div class="card-detail-container shifted-up">
    <div v-if="post">
      <!-- Display post details if 'post' data is available -->
      <h3>{{ post.title }}</h3>
      <img :src="post.imageUrl" alt="Post Image" class="post-detail-image" />
      <p>{{ post.content }}</p>
      <p>ID: {{ post.id }}</p>
      <button v-if="isCurrentUserPostCreator(post)" @click="deletePost">
        Delete
      </button>
    </div>
    <div v-else>
      <!-- Display 'Loading...' when post data is being fetched -->
      <p>Loading...</p>
    </div>
    <div v-if="error">
      <!-- Display error message if 'error' is set -->
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // Define reactive variables
    const post = ref(null);
    const error = ref(null);
    const currentUser = ref(null);

    // Get the router instance
    const router = useRouter();

    // Fetch post details after the component is mounted
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${props.id}`
        );
        if (response.status === 200) {
          // Set 'post' data if the request is successful
          post.value = response.data;
          currentUser.value = JSON.parse(localStorage.getItem("userId"));
        } else {
          // Set 'error' if the request fails
          error.value = "Failed to fetch post";
        }
      } catch (e) {
        // Handle errors during data fetching
        error.value = "An error occurred while fetching the post";
      }
    });

    // Check if the current user is the creator of the post
    const isCurrentUserPostCreator = (post) => {
      return post.userId === currentUser.value;
    };

    // Delete the post
    const deletePost = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/posts/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          // Display a success message and redirect to the homepage
          alert("Post deleted successfully");
          router.push("/");
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
    };

    // Return reactive variables and functions
    return {
      post,
      error,
      isCurrentUserPostCreator,
      deletePost,
    };
  },
};
</script>

<style>
@import "../assets/styles/main.css";
</style>
