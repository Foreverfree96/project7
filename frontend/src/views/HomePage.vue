<template>
  <div>
    <ul class="post-list">
      <li v-for="item in items" :key="item.id" class="post-card">
        <div class="post-header">
          <h3>{{ item.title }}</h3>
          <div v-if="!dataLoading">
            <span class="badge" :class="badgeClass(item)">
              {{ badgeText(item) }}
            </span>
          </div>
        </div>
        <div class="post-content">
          <div v-if="item.imageUrl" class="post-image">
            <img :src="item.imageUrl" alt="Post Image" />
          </div>
          <p>{{ item.content }}</p>
        </div>
        <div class="post-footer">
          <router-link
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
      items: [],
      dataLoading: true,
      imageUrl: "http://localhost:3000/images/",
    };
  },
  async mounted() {
    await this.fetchData();
  },
  computed: {
    lastVisitTimestamp() {
      return JSON.parse(localStorage.getItem("lastVisitTimestamp")) || 0;
    },
    currentUser() {
      return JSON.parse(localStorage.getItem("userId"));
    },
  },
  methods: {
    async fetchData() {
      console.log("Fetching data...");
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:3000/api/posts", {
          headers,
        });
        if (response.status === 200) {
          const posts = response.data;
          this.items = posts.map((post) => {
            const storedReadState = localStorage.getItem(
              `readState_${post.id}`
            );
            const usersRead = storedReadState
              ? JSON.parse(storedReadState)
              : [];
            console.log(post.userId, this.currentUser, "**************");
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

            return {
              ...post,
              imageUrl: `${post.imageUrl}`,
              usersRead,
            };
          });
          console.log(this.items);

          console.log("RACE CONDITIONS ARE FUN");

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
    async markPostAsViewed(item) {
      if (!this.isPostRead(item)) {
        await this.markItemAsRead(item);
        this.updateBadge(item);
      }
    },
    updateBadge(item) {
      const index = this.items.findIndex((post) => post.id === item.id);
      if (index !== -1) {
        this.items[index] = {
          ...item,
          usersRead: item.usersRead,
        };
      }
    },
    isCurrentUserPostCreator(post) {
      return post.userId === this.currentUser;
    },
    badgeText(item) {
      if (this.isPostRead(item) || this.isCurrentUserPostCreator(item)) {
        return "Read";
      } else {
        return "New";
      }
    },
    badgeClass(item) {
      if (this.isPostRead(item) || this.isCurrentUserPostCreator(item)) {
        return "read-badge";
      } else {
        return "new-badge";
      }
    },
    shouldShowNewBadge(item) {
      console.log("HERE****");
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
      console.log("MARK NEW POSTS");
      for (const item of this.items) {
        if (this.shouldShowNewBadge(item)) {
          await this.markItemAsRead(item);
          this.updateBadge(item);
        }
      }
    },
    async markItemAsRead(item) {
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
      return item.usersRead.includes(this.currentUser);
    },
  },
});
</script>

<style>
@import "../assets/styles/main.css";
</style>
