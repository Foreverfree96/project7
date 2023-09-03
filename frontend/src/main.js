// Import necessary functions from Vue
import { createApp } from "vue";
import App from "./App.vue"; // Import the root Vue component
import router from "./router"; // Import the Vue Router instance (update the path as needed)

// Create a new Vue app instance
const app = createApp(App);

// Use the Vue Router instance in the Vue app
app.use(router);

// Mount (attach) the Vue app to the HTML element with the ID "app"
app.mount("#app");
