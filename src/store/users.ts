import {Module, Mutation, VuexModule, getModule} from "vuex-module-decorators";
import {User} from "@/types/dto";
import {stateDecoratorFactory} from "@/store/stateDecoratorFactory";
import {store} from "@/store/store";

@Module({
  dynamic: true,
  name: "user",
  store,
})
export class Users extends VuexModule {
  public users: User[] = [];

  public get filteredUsers(): User[] {
    const USER_LIMIT = 5;
    return this.users.filter((el: User) => el.id > USER_LIMIT);
  }

  @Mutation
  public setUsers(payload: User[]): void {
    this.users = payload;
  }
}

export const userModule: Users = getModule(Users);

export const UserState: <ConsumerType extends (ConsumerType[PropName] extends Users[PropName] ? unknown : never),
  PropName extends (keyof ConsumerType & keyof Users)>(vueComponent: ConsumerType, fileName: PropName) => void =
    stateDecoratorFactory(userModule);
