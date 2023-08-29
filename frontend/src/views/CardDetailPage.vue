<template>
  <div class="card-detail-container">
    <div v-if="post">
      <h3>{{ post.title }}</h3>
      <img :src="post.imageUrl" alt="Post Image" />
      <p>{{ post.content }}</p>
      <p>ID: {{ post.id }}</p>
      <button v-if="isCurrentUserPostCreator(post)" @click="deletePost">
        Delete
      </button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="error">
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
    const post = ref(null);
    const error = ref(null);
    const currentUser = ref(null);

    const router = useRouter();
    onMounted(async () => {
      try {
        // Fetch post details after the component is mounted
        const response = await axios.get(
          `http://localhost:3000/api/posts/${props.id}`
        );
        if (response.status === 200) {
          post.value = response.data;
          currentUser.value = JSON.parse(localStorage.getItem("userId"));
        } else {
          error.value = "Failed to fetch post";
        }
      } catch (e) {
        error.value = "An error occurred while fetching the post";
      }
    });

    const isCurrentUserPostCreator = (post) => {
      return post.userId === currentUser.value;
    };

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
          alert("Post deleted successfully");
          router.push("/"); // Redirect to the homepage
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
