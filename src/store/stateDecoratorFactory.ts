import {VuexModule} from "vuex-module-decorators";

export const stateDecoratorFactory =
    function stateDecoratorFactory<TPT extends VuexModule>(vuexModule: TPT):
    <TCT extends (TCT[TPN] extends TPT[TPN] ? unknown : never),
      TPN extends (keyof TCT & keyof TPT),
    >(vueComponent: TCT,
      fileName: TPN) => void {
      return <TCT extends (TCT[TPN] extends TPT[TPN] ? unknown : never),
        TPN extends (keyof TCT & keyof TPT),
      >(vueComponent: TCT,
        fileName: TPN): void => {
        Object.defineProperty(
          vueComponent,
          fileName,
          Object.getOwnPropertyDescriptor(
            vuexModule,
            fileName,
          ) as PropertyDescriptor,
        );
      };
    };
