import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Update the import path to match your project structure

const app = createApp(App);
app.use(router);
app.mount("#app");
