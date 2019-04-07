import '@/utils/classComponentHooks';

import App from '@/components/App';
import {GIT_HASH, IS_DEBUG} from '@/utils/consts';
import {Vue} from 'vue-property-decorator';
import {api, loggerMixin} from '@/utils/singletons';
import VueRouter from 'vue-router';
import Vuex, {Store} from "vuex";
import {RootState} from "@/types/model";
import {storeState} from "@/utils/store";
import {routes} from "@/utils/router";

window.GIT_VERSION = GIT_HASH;

Vue.mixin(loggerMixin);
Vue.use(VueRouter);
Vue.use(Vuex);

const store: Store<RootState> = new Store<RootState>(storeState);
const router: VueRouter = new VueRouter(routes);

document.addEventListener('DOMContentLoaded', () => {
  let vue = new Vue({router, store, render: h => h(App)});
  if (IS_DEBUG) {
    window.vue = vue;
    window.store = store;
    window.router = router;
    window.api = api;
  }
  vue.$mount('#app');
});
