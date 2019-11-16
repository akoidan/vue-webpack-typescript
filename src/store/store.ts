import {RootState} from "@/types/model";
import Vue from "vue";
import Vuex, {Store} from "vuex";

Vue.use(Vuex);

export const store: Store<RootState> = new Store<RootState>({});
