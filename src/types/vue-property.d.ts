import {RootState} from "@/types/model";
import {Api} from "@/utils/api";
import {Logger} from "lines-logger";
import Vue from "vue";
import VueRouter from "vue-router";
import {Store} from "vuex";

declare module "vue/types/vue" {

    interface Vue {
        $logger: Logger;
        $api: Api;
    }
}

declare global {
    interface Window {
        GIT_VERSION: string|undefined;
        vue: Vue;
        store: Store<RootState>;
        router: VueRouter;
        api: Api;
    }
}
