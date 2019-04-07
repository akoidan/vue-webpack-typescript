import PostsPage from '@/components/pages/PostsPage.vue';
import {RouterOptions} from 'vue-router';
import UsersPage from "@/components/pages/UsersPage.vue";

export const routes: RouterOptions = {
  mode: 'history',
  routes: [
    {
      path: '/posts',
      component: PostsPage
    },
    {
      path: '/users',
      component: UsersPage
    }
  ]
};
