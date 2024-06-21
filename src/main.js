import { createApp } from "vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"


import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(autoAnimatePlugin).use(createPinia().use(piniaPluginPersistedState)).mount("#app");
