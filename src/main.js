// 样式
import "@/styles/index.js";

// 仓库
import store from "./store";

// 路由
import router from "./router";

import {createApp} from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
