<template>
  <div>
    <!-- Your component content -->
    <div v-if="dataLoading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  // components: {
    
  // },
  data() {
    return {
      items: [],
      dataLoading: true,
    };
  },
  mounted() {
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
};
</script>
