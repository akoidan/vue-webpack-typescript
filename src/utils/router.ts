import FilteredUsersPage from "@/components/pages/FilteredUsersPage.vue";
import PostsPage from "@/components/pages/PostsPage.vue";
import UsersPage from "@/components/pages/UsersPage.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router: VueRouter = new VueRouter({
  routes: [
    {
      component: PostsPage,
      path: "/posts",
    },
    {
      component: UsersPage,
      path: "/users",
    },
    {
      component: FilteredUsersPage,
      path: "/filtered-users",
    },
  ],
});
