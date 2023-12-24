import { createApp } from "vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(autoAnimatePlugin).use(createPinia()).mount("#app");
