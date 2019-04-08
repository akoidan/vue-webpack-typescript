import App from '@/components/App';
import '@/utils/classComponentHooks';
import {GIT_HASH, IS_DEBUG} from '@/utils/consts';
import '@/utils/mixins';
import {router} from '@/utils/router';
import {api} from '@/utils/singletons';
import {store} from '@/utils/store';
import Vue from 'vue';

window.GIT_VERSION = GIT_HASH;
Vue.prototype.$api = api;

document.addEventListener('DOMContentLoaded', () => {
  const vue: Vue = new Vue({router, store, render: (h: Function): typeof Vue.prototype.$createElement => h(App)});
  if (IS_DEBUG) {
      window.vue = vue;
      window.store = store;
      window.router = router;
      window.api = api;
  }
  vue.$mount('#app');
});
