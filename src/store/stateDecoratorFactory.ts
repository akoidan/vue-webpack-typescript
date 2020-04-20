import {VuexModule} from "vuex-module-decorators";

/**
 * Allows injecting state directory to component by decorator
 * https://github.com/championswimmer/vuex-module-decorators/issues/191
 * Generics bellow ensure that this decorator can be only applied to the same type as vuexModule support
 * e.g:
 *
 * @Module
 * class DefaultStore extends VuexModule {
 *    public user: User;
 * }
 *
 * const StateDecorator = stateDecoratorFactory(new DefaultStore())
 *
 * @Component
 * class App extends Vue {
 *   @StateDecorator
 *   public user!: User;
 * }
 *
 * TCT - TypeConsumerType = type of Vue component class which decorator is applied. "App" in the example above.
 * TPN - TypePropertyName = name of the property which decorator can be applied to. "User" in the example above.
 * TPT - TypeProviderType = type of vuex store which is factory is beeing called. "DefaultStore" in the example above.
 */
function stateDecoratorFactory<TPT extends VuexModule>(vuexModule: TPT):
<TCT extends (TCT[TPN] extends TPT[TPN] ? unknown : never), TPN extends (keyof TCT & keyof TPT)>
(vueComponent: TCT, fileName: TPN) => void {
  return <TCT extends (TCT[TPN] extends TPT[TPN] ? unknown : never), TPN extends (keyof TCT & keyof TPT)>
  (vueComponent: TCT, fileName: TPN): void => {
    Object.defineProperty(
      vueComponent,
      fileName,
      Object.getOwnPropertyDescriptor(
        vuexModule,
        fileName,
      ) as PropertyDescriptor,
    );
  };
}

export {stateDecoratorFactory};
