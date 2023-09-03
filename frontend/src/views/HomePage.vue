<template>
  <div>
    <ul class="post-list">
      <!-- Loop through items using v-for -->
      <li v-for="item in items" :key="item.id" class="post-card">
        <div class="post-header">
          <h3>{{ item.title }}</h3>
          <div v-if="!dataLoading">
            <!-- Display badge based on post status -->
            <span class="badge" :class="badgeClass(item)">
              {{ badgeText(item) }}
            </span>
          </div>
        </div>
        <div class="post-content">
          <div v-if="item.imageUrl" class="post-image">
            <!-- Display post image if available -->
            <img :src="item.imageUrl" alt="Post Image" />
          </div>
          <p>{{ item.content }}</p>
        </div>
        <div class="post-footer">
          <!-- Link to view post details and mark as viewed -->
          <router-link
            class="view-details-edit"
            :to="{ name: 'post', params: { id: item.id } }"
            @click="markPostAsViewed(item)"
          >
            View Details
          </router-link>
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
      // Initialize data properties
      items: [],
      dataLoading: true,
      imageUrl: "http://localhost:3000/images/",
    };
  },
  async mounted() {
    // Fetch data when the component is mounted
    await this.fetchData();
  },
  computed: {
    lastVisitTimestamp() {
      // Get the last visit timestamp from localStorage
      return JSON.parse(localStorage.getItem("lastVisitTimestamp")) || 0;
    },
    currentUser() {
      // Get the current user from localStorage
      return JSON.parse(localStorage.getItem("userId"));
    },
  },
  methods: {
    async fetchData() {
      console.log("Fetching data...");
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = { Authorization: `Bearer ${token}` };
        // Fetch data from the API
        const response = await axios.get("http://localhost:3000/api/posts", {
          headers,
        });
        if (response.status === 200) {
          const posts = response.data;
          // Process and update the items array
          this.items = posts.map((post) => {
            // Process each post item
            const storedReadState = localStorage.getItem(
              `readState_${post.id}`
            );
            const usersRead = storedReadState
              ? JSON.parse(storedReadState)
              : [];

            // Check if the post is owned by the current user
            if (post.userId === this.currentUser) {
              this.markItemAsRead(post);
            } else if (!post.userId === this.currentUser) {
              // Remove the 'Read' status for non-user posts during data fetch
              const index = this.items.findIndex((item) => item.id === post.id);
              if (index !== -1) {
                this.items[index].usersRead = usersRead.filter(
                  (userId) => userId !== this.currentUser
                );
              }
            }

            // Return the processed post item
            return {
              ...post,
              imageUrl: `${post.imageUrl}`,
              usersRead,
            };
          });

          console.log(this.items);

          this.dataLoading = false;
        } else {
          console.error("Error fetching data:", response.statusText);
          this.dataLoading = false;
        }
      } catch (error) {
        console.error("Network error:", error);
        this.dataLoading = false;
      }
    },
    markPostAsViewed(item) {
      // Mark a post as viewed if it's not already read
      if (!this.isPostRead(item)) {
        this.markItemAsRead(item);
        this.updateBadge(item);
      }
    },
    updateBadge(item) {
      // Update the badge for a post
      const index = this.items.findIndex((post) => post.id === item.id);
      if (index !== -1) {
        this.items[index] = {
          ...item,
          usersRead: item.usersRead,
        };
      }
    },
    isCurrentUserPostCreator(post) {
      // Check if the current user is the creator of a post
      return post.userId === this.currentUser;
    },
    badgeText(item) {
      // Determine the text for the badge based on post status
      if (this.isPostRead(item) || this.isCurrentUserPostCreator(item)) {
        return "Read";
      } else {
        return "New";
      }
    },
    badgeClass(item) {
      // Determine the CSS class for the badge based on post status
      if (this.isPostRead(item) || this.isCurrentUserPostCreator(item)) {
        return "read-badge";
      } else {
        return "new-badge";
      }
    },
    shouldShowNewBadge(item) {
      // Determine if a new badge should be shown for a post
      const isNewPost =
        new Date(item.createdAt) > new Date(this.lastVisitTimestamp);
      const isCurrentUserPost = this.isCurrentUserPostCreator(item);
      const isPostRead = this.isPostRead(item); // Check if the post is read by the current user

      console.log(isCurrentUserPost, isNewPost, isPostRead);
      if (isNewPost && !isCurrentUserPost && !isPostRead) {
        return true;
      }

      return false;
    },
    async markNewPostsAsRead() {
      // Mark new posts as read
      for (const item of this.items) {
        if (this.shouldShowNewBadge(item)) {
          await this.markItemAsRead(item);
          this.updateBadge(item);
        }
      }
    },
    async markItemAsRead(item) {
      // Mark a post item as read by the current user
      if (!item.usersRead) {
        item.usersRead = []; // Initialize the array if it's undefined
      }
      if (!this.isPostRead(item)) {
        item.usersRead.push(this.currentUser);
        localStorage.setItem(
          `readState_${item.id}`,
          JSON.stringify(item.usersRead)
        );
      }
      console.log(item.usersRead, item.title);
    },
    isPostRead(item) {
      // Check if a post is read by the current user
      return item.usersRead.includes(this.currentUser);
    },
  },
});
</script>

<style>
@import "../assets/styles/main.css";
</style>
