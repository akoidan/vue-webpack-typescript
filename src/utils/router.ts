import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {ApiConsts} from "@/utils/consts";
import BasePage from "@/components/pages/BasePage.vue";
import HomePage from "@/components/pages/HomePage.vue";
import NotFoundPage from "@/components/pages/NotFoundPage.vue";
import RepoBranchesPage from "@/components/pages/RepoBranchesPage.vue";
import RepoCommitPage from "@/components/pages/RepoCommitPage.vue"; // eslint-disable-line import/max-dependencies


const router = createRouter({
  history: ApiConsts.ROUTER_HISTORY_MODE === "history" ? createWebHistory() : createWebHashHistory(),
  routes: [
    {
      children: [
        {
          component: HomePage,
          path: "/",
        },
        {
          component: RepoBranchesPage,
          path: "/branches",
        },
        {
          component: RepoCommitPage,
          path: "/commit/:id",
          props: true,
        },
      ],
      component: BasePage,
      path: "/",
    },
    {
      component: NotFoundPage,
      path: "/:catchAll(.*)",
    },
  ],
});

export {router};
