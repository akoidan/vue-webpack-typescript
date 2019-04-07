import FilteredUsersPage from '@/components/pages/FilteredUsersPage.vue';
import PostsPage from '@/components/pages/PostsPage.vue';
import UsersPage from '@/components/pages/UsersPage.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router: VueRouter = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/posts',
      component: PostsPage
    },
    {
      path: '/users',
      component: UsersPage
    },
    {
      path: '/filtered-users',
      component: FilteredUsersPage
    }
  ]
});
