<template>
  <div class="create-post-container">
    <div class="image-preview">
      <img :src="previewImage" v-if="previewImage" alt="Image Preview" />
    </div>
    <div class="form-container">
      <h2>Create a New Post</h2>
      <form @submit.prevent="submitPost">
        <label for="title">Title:</label>
        <input type="text" v-model="postData.title" required />

        <label for="content">Content:</label>
        <textarea v-model="postData.content" required></textarea>

        <!-- Add file input for uploading an image -->
        <div class="image-input-container">
          <label for="pic-image">Image:</label>
          <input
            type="file"
            id="pic-image"
            ref="imageInput"
            @change="onImageChange"
          />

          <!-- Display a preview of the selected image -->
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      postData: {
        title: "",
        content: "",
        image: null,
      },
      previewImage: null, // Variable to store the image preview URL
      token: "", // Initialize the token property
    };
  },
  mounted() {
    // Get the authentication token from localStorage and assign it to this.token
    this.token = JSON.parse(localStorage.getItem("token"));
  },
  methods: {
    // Method to handle the image selection
    onImageChange(event) {
      const file = event.target.files[0];
      this.postData.image = file;

      // Display a preview of the selected image
      this.previewImage = URL.createObjectURL(file);
    },

    // Method to submit the post data to the server
    async submitPost() {
      // You can use axios or fetch API to send the form data to the server
      // Example using axios:
      const formData = new FormData();
      formData.append("title", this.postData.title);
      formData.append("content", this.postData.content);
      formData.append("image", this.postData.image);

      try {
        await axios.post("/api/submitData", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`, // If you need to send the token to the server for authentication
          },
        });

        // Post submitted successfully, you can show a success message or redirect to a different page
        alert("Post submitted successfully");
      } catch (error) {
        console.error("Error submitting post:", error);
        // Handle the error, show an error message, etc.
      }
    },
  },
};
</script>

<style>
/* Add your custom styles for the component here */

/* Add the rest of your form styles here */
</style>
