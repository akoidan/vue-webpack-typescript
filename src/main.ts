// ClassComponentHooks and mixins should be imported before others
import "@/assets/sass/globals.sass";
import "@/utils/classComponentHooks"; // eslint-disable-line import/no-unassigned-import
import {
  api,
  xhr,
} from "@/utils/singletons";
import {ApiConsts} from "@/utils/consts"; // eslint-disable-line import/no-namespace
import App from "@/components/App.vue";
import {LoggerMixin} from "@/utils/mixins";
import {createApp} from "vue";
// TODO https://github.com/typescript-eslint/typescript-eslint/issues/2315
import {router} from "@/utils/router";
import {store} from "@/store/store";


const vue = createApp(App, {
  mixins: [LoggerMixin],
  store,
})
vue.use(router);

vue.mount("#app");

vue.config.globalProperties.$api = api;

window.consts = ApiConsts;
window.router = router;
window.store = store;
window.api = api;
window.xhr = xhr;
window.vue = vue;
