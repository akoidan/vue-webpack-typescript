import App from '@/components/App';
import {RootState} from '@/types/model';
import '@/utils/classComponentHooks';
import {GIT_HASH, IS_DEBUG} from '@/utils/consts';
import {LoggerMixin} from '@/utils/mixins';
import {routes} from '@/utils/routes';
import {api} from '@/utils/singletons';
import {storeState} from '@/utils/storeState';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex, {Store} from 'vuex';

window.GIT_VERSION = GIT_HASH;

Vue.mixin(LoggerMixin);
Vue.use(VueRouter);
Vue.use(Vuex);

const store: Store<RootState> = new Store<RootState>(storeState);
const router: VueRouter = new VueRouter(routes);
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
