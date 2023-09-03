<template>
  <div class="create-post-container">
    <div class="image-preview">
      <!-- Display image preview if 'previewImage' is available -->
      <img v-if="previewImage" :src="previewImage" alt="Image Preview" />
    </div>
    <div class="form-container">
      <h2>Create a New Post</h2>
      <form @submit.prevent="submitPost">
        <!-- Input fields for title and content -->
        <input v-model="postData.title" placeholder="Title" />
        <textarea v-model="postData.content" placeholder="Content"></textarea>
        <!-- File input for image -->
        <input
          type="file"
          id="pic-image"
          ref="imageInput"
          @change="onImageChange"
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data: () => ({
    // Initialize data properties
    postData: {
      title: "",
      content: "", // Make sure 'content' is initialized here
      image: null,
    },
    previewImage: null,
    token: "",
    loggedIn: false,
  }),
  mounted() {
    // Get the token and set 'loggedIn' status from localStorage
    this.token = JSON.parse(localStorage.getItem("token"));
    this.loggedIn = true;
  },
  methods: {
    onImageChange(event) {
      // Update 'postData.image' and 'previewImage' when an image is selected
      this.postData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.postData.image);
    },
    async submitPost() {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("title", this.postData.title);
      formData.append("content", this.postData.content);

      // Append the image data only if it's not null
      if (this.postData.image) {
        formData.append("image", this.postData.image);
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/posts/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle the response here, e.g., display a success message
        console.log("Post created successfully:", response.data);
        // Optionally, you can perform some actions after a successful post creation
      } catch (error) {
        // Handle the error here, e.g., show an error message to the user
        console.error("Error submitting post:", error);
      }
    },
  },
});
</script>

<style></style>
