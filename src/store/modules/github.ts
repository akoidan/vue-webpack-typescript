import {Module, Mutation, VuexModule, getModule} from "vuex-module-decorators";
import type {Branch} from "@/types/model";
import type {IGithubState} from "@/types/store";
import {stateDecoratorFactory} from "vuex-module-decorators-state";
import {store} from "@/store/store";

/**
 * Main vuex module which shares state across multiple vue components.
 * This is required to avoid hunders of VueBuses when state sharing is required
 */
@Module({
  dynamic: true,
  name: "github",
  store,
})
class GithubModule extends VuexModule implements IGithubState {
  public branches: null|Branch[] = null;

  @Mutation
  public setBranches(payload: Branch[]): void {
    this.branches = payload;
  }
}

const githubModule: GithubModule = getModule(GithubModule);

/*
 * TPN - TypePropertyName
 * TCT - TypeConsumerType
 * the generics bellow are inherited strictly from stateDecoratorFactory, see its docs
 */
const GithubState: <TCT extends (TCT[TPN] extends GithubModule[TPN] ? unknown : never),
  TPN extends (keyof TCT & keyof GithubModule)>(vueComponent: TCT, fileName: TPN) => void =
    stateDecoratorFactory(githubModule);

export {githubModule, GithubModule, GithubState};
