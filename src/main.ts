// ClassComponentHooks and mixins should be imported before others
import "@/assets/sass/globals.sass";
import "@/utils/classComponentHooks"; // eslint-disable-line import/no-unassigned-import
import "@/utils/mixins"; // eslint-disable-line import/no-unassigned-import
import {api, xhr} from "@/utils/singletons";
import {ApiConsts} from "@/utils/consts"; // eslint-disable-line import/no-namespace
import App from "@/components/App.vue";
import Vue from "vue";
import {router} from "@/utils/router";
import {store} from "@/store/store";

Vue.prototype.$api = api;

window.consts = ApiConsts;
window.router = router;
window.store = store;
window.api = api;
window.xhr = xhr;

const vue: Vue = new Vue({
  render: (createElement: Function): typeof Vue.prototype.$createElement => createElement(App),
  router,
  store
});

window.vue = vue;

vue.$mount("#app");
