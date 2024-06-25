import { createApp } from "vue";
import "./reset.css";
import "./assets/base.scss";
import App from "./App.vue";
import router from "./plugins/router.ts";

// fix for apple on hover
document.body.addEventListener("click", () => {});

createApp(App).use(router).mount("#app");
