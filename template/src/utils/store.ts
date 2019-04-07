import {User} from '@/types/dto';
import {RootState} from '@/types/model';
import Vue from 'vue';
import Vuex, {Store} from 'vuex';

Vue.use(Vuex);

export const store: Store<RootState> = new Store<RootState>({
  state: {users: []},
  mutations: {
    setUsers(state: RootState, payload: User[]): void {
      state.users = payload;
    }
  },
  getters: {
    filteredUsers(state: RootState): User[] {
      return state.users.filter((e: User) => e.id > 5);
    }
  }
});
