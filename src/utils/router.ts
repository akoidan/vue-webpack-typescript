import FilteredUsersPage from "@/components/pages/FilteredUsersPage";
import PostsPage from "@/components/pages/PostsPage";
import UsersPage from "@/components/pages/UsersPage";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router: VueRouter = new VueRouter({
  "mode": "history",
  "routes": [
    {
      "path": "/posts",
      "component": PostsPage
    },
    {
      "path": "/users",
      "component": UsersPage
    },
    {
      "path": "/filtered-users",
      "component": FilteredUsersPage
    }
  ]
});
