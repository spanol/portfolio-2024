import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiGithub,
  BiLinkedin,
  BiList,
  BiLink45Deg,
  BiTwitter,
  ViFileTypeHtml,
  ViFileTypeCss,
  ViFileTypeJs,
  CoPostgresql,
  ViFileTypeTailwind,
  ViFileTypeAngular,
  ViFileTypeArduino,
  ViFileTypeCsharp,
  ViFileTypeDocker,
  ViFileTypeNestjs,
  PrMapMarker,
} from "oh-vue-icons/icons";

addIcons(
  BiGithub,
  BiLinkedin,
  BiTwitter,
  BiList,
  BiLink45Deg,
  ViFileTypeHtml,
  ViFileTypeCss,
  ViFileTypeJs,
  ViFileTypeTailwind,
  ViFileTypeAngular,
  ViFileTypeArduino,
  CoPostgresql,
  ViFileTypeCsharp,
  ViFileTypeDocker,
  ViFileTypeNestjs,
  PrMapMarker
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(router);
app.mount("#app");
