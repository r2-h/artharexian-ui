import App from "./App.vue";
import { initTheme } from "./composables/useTheme";
import "./styles/style.css";
import { createApp } from "vue";

// Инициализируем тему до монтирования приложения
initTheme();

createApp(App).mount("#app");
