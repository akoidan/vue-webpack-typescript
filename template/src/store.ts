import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
Vue.use(Vuex);


const store: StoreOptions<RootState> = {
  state: {
    version: 1
  },
  mutations: {
    incVersion(state) {
      state.version += 1;
    },
  }
};


export default new Vuex.Store<RootState>(store);