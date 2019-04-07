import {Logger} from 'lines-logger';
import {Vue} from "vue/types/vue";
import {Store} from "vuex";
import {RootState} from "@/types/model";
import {VueRouter} from "vue-router/types/router";
import {Api} from "@/utils/api";

declare module 'vue/types/vue' {

    interface Vue {
        logger: Logger;
    }
}

declare global {
    interface Window {
        GIT_VERSION: string|undefined;
        vue: Vue;
        store: Store<RootState>;
        router: VueRouter;
        api: Api
    }
}
