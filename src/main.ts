import "@/utils/classComponentHooks";
import "@/utils/mixins";
import {GIT_HASH, IS_DEBUG} from "@/utils/consts";
import App from "@/components/App.vue";
import Vue from "vue";
import {api} from "@/utils/singletons";
import {router} from "@/utils/router";
import {store} from "@/store/store";

window.GIT_VERSION = GIT_HASH;
Vue.prototype.$api = api;

const init: () => void = (): void => {
  const vue: Vue = new Vue({
    render: (hhh: Function): typeof Vue.prototype.$createElement => hhh(App),
    router,
    store,
  });
  if (IS_DEBUG) {
    window.vue = vue;
    window.store = store;
    window.router = router;
    window.api = api;
  }
  vue.$mount("#app");
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
