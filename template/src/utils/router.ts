import Vue from 'vue';
import VueRouter from 'vue-router';

import Version from '../components/pages/Version.vue';

Vue.use(VueRouter);

export const router: VueRouter = new VueRouter({
  routes: [
    {
      path: '/version',
      component: Version,
      name: 'auth',
    },
  ],
});
