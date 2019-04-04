import Version from '@/components/pages/Version.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

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
