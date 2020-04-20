import {Module, Mutation, VuexModule, getModule} from "vuex-module-decorators";
import {IUserState} from "@/types/store";
import {User} from "@/types/model";
import {stateDecoratorFactory} from "@/store/stateDecoratorFactory";
import {store} from "@/store/store";

/**
 * Main vuex module which shares state across multiple vue components.
 * This is required to avoid hunders of VueBuses when state sharing is required
 */
@Module({
  dynamic: true,
  name: "users",
  store,
})
class UserModule extends VuexModule implements IUserState {
  public users: User[] = [];

  @Mutation
  public setUsers(payload: User[]): void {
    this.users = payload;
  }
}

const userModule: UserModule = getModule(UserModule);

/*
 * TPN - TypePropertyName
 * TCT - TypeConsumerType
 * the generics bellow are inherited strictly from stateDecoratorFactory, see its docs
 */
const UserState: <TCT extends (TCT[TPN] extends UserModule[TPN] ? unknown : never),
  TPN extends (keyof TCT & keyof UserModule)>(vueComponent: TCT, fileName: TPN) => void =
    stateDecoratorFactory(userModule);

export {userModule, UserState};
