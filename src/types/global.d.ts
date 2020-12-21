import type {Api} from "@/utils/api";
import type {Consts} from "@/types/model";
import type {IRootState} from "@/types/store";
import type {Logger} from "lines-logger";
import type {Store} from "vuex";
import type Vue from "vue";
import type VueRouter from "vue-router";
import type {Xhr} from "@/utils/xhr";

declare module "vue/types/vue" {

  interface Vue {
    $logger: Logger;
    $api: Api;
  }
}

declare global {
  interface Window {
    vue: Vue;
    store: Store<IRootState>;
    xhr: Xhr;
    consts: Consts;
    router: VueRouter;
    api: Api;
  }
}
