// ClassComponentHooks and mixins should be imported before others
import "@/assets/sass/globals.sass";
import "@/utils/classComponentHooks"; // eslint-disable-line import/no-unassigned-import
import "@/utils/mixins"; // eslint-disable-line import/no-unassigned-import
import type {CreateElement, VNode} from "vue";
import {api, xhr} from "@/utils/singletons";
import {ApiConsts} from "@/utils/consts"; // eslint-disable-line import/no-namespace
import App from "@/components/App.vue";
import { createApp } from 'vue'
// TODO https://github.com/typescript-eslint/typescript-eslint/issues/2315
import Vue from "vue"; // eslint-disable-line no-duplicate-imports
import {router} from "@/utils/router";
import {store} from "@/store/store";

Vue.prototype.$api = api; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

createApp(App, {}).mount('#app')

window.consts = ApiConsts;
window.router = router;
window.store = store;
window.api = api;
window.xhr = xhr;

const vue: Vue = new Vue({
  render: (createElement: CreateElement): VNode => createElement(App),
  router,
  store
});

window.vue = vue;

vue.$mount("#app");
