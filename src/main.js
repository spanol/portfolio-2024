import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiGithub,
  BiLinkedin,
  ViFileTypeHtml,
  ViFileTypeCss,
  ViFileTypeJs,
  ViFileTypeTailwind,
  ViFileTypeAngular,
  ViFileTypeCsharp,
  ViFileTypeDocker,
  ViFileTypeNestjs,
} from "oh-vue-icons/icons";

addIcons(
  BiGithub,
  BiLinkedin,
  ViFileTypeHtml,
  ViFileTypeCss,
  ViFileTypeJs,
  ViFileTypeTailwind,
  ViFileTypeAngular,
  ViFileTypeCsharp,
  ViFileTypeDocker,
  ViFileTypeNestjs
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(router);
app.mount("#app");
