import "bootstrap";
import "./styles/app.scss";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
// import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";

createApp(App).use(router).mount("#app");
