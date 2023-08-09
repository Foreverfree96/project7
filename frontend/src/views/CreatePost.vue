<template>
  <div class="create-post-container">
    <div class="image-preview">
      <img :src="previewImage" v-if="previewImage" alt="Image Preview" />
    </div>
    <div class="form-container">
      <h2>Create a New Post</h2>

      <form @submit.prevent="submitPost" enctype="multipart/form-data">
        <label for="title">Title:</label>
        <input type="text" v-model="postData.title" required />

        <label for="content">Content:</label>
        <textarea v-model="postData.content" required></textarea>

        <div class="image-input-container">
          <label for="pic-image">Image:</label>
          <input
            type="file"
            id="pic-image"
            ref="imageInput"
            @change="onImageChange"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      postData: {
        title: "",
        content: "",
        image: null,
      },
      previewImage: null,
      token: "",
    };
  },
  mounted() {
    this.token = JSON.parse(localStorage.getItem("token"));
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      this.postData.image = file;
      this.previewImage = URL.createObjectURL(file);
    },
    async submitPost() {
      if (!this.userId) {
        console.error("User ID is missing or invalid");
        return;
      }
      const formData = new FormData();
      formData.append("title", this.postData.title);
      formData.append("content", this.postData.content);
      const file = this.$refs.imageInput.files[0];
      formData.append("image", file);
      formData.append("userId", this.userId);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/posts/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.status === 201) {
          alert("Post submitted successfully");
          this.$router.push("/");
        } else {
          // Handle other response statuses if required
        }
      } catch (error) {
        console.error("Error submitting post:", error.message);
      }
    },
  },
});
</script>

<style>
/* Add your custom styles for the component here */
/* Add the rest of your form styles here */
</style>
