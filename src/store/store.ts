import Vuex, {Store} from "vuex";
import type {IRootState} from "@/types/store";
import Vue from "vue";

Vue.use(Vuex);

export const store: Store<IRootState> = new Store<IRootState>({});
