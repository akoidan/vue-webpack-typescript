import FilteredUsersPage from "@/components/pages/FilteredUsersPage";
import PostsPage from "@/components/pages/PostsPage";
import UsersPage from "@/components/pages/UsersPage";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router: VueRouter = new VueRouter({
  mode: "history",
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
