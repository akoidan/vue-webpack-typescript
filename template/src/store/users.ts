import {store} from '@/store/store';
import {User} from '@/types/dto';
import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

/**
 * User vuex module
 */
@Module({ dynamic: true, store, name: 'user' })
export class Users extends VuexModule {
  public users: User[] = [];

  public get filteredUsers (): User[] {
    return this.users.filter((e: User) => e.id > 5);
  }
  @Mutation
  public setUsers(payload: User[]): void {
    this.users = payload;
  }
}

export const userModule: Users = getModule(Users);
