import {RootState} from '@/types/model';
import Vue from 'vue';
import Vuex, {Store, StoreOptions} from 'vuex';

export const storeState: StoreOptions<RootState> = {
  state: {version: 1},
  mutations: {
    incVersion(state) {
      state.version += 1;
    },
  }
};
