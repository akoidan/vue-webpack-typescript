import VueRouter from 'vue-router';
import Version from '../components/pages/Version.vue';
import Vue from 'vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/version',
      component: Version,
      name: 'auth',
    },
  ],
});
