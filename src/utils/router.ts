import {ApiConsts} from "@/utils/consts";
import BasePage from "@/components/pages/BasePage.vue";
import HomePage from "@/components/pages/HomePage.vue";
import NotFoundPage from "@/components/pages/NotFoundPage.vue";
import RepoBranchesPage from "@/components/pages/RepoBranchesPage.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import RepoCommitPage from "@/components/pages/RepoCommitPage.vue"; // eslint-disable-line import/max-dependencies

Vue.use(VueRouter);

export const router: VueRouter = new VueRouter({
  // https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode
  mode: ApiConsts.ROUTER_HISTORY_MODE,
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
      path: "",
    },
    {
      component: NotFoundPage,
      path: "*",
    },
  ],
});
