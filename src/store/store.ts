import Vuex, {Store} from "vuex";
import {RootState} from "@/types/model";
import Vue from "vue";

Vue.use(Vuex);

export const store: Store<RootState> = new Store<RootState>({});
