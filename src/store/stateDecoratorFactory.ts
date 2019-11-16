import {VuexModule} from "vuex-module-decorators";

export function stateDecoratorFactory<ProviderType extends VuexModule> (vuexModule: ProviderType):
    <ConsumerType extends (ConsumerType[PropName] extends ProviderType[PropName] ? unknown : never),
        PropName extends (keyof ConsumerType & keyof ProviderType),
        >(vueComponent: ConsumerType,
          fileName: PropName) => void {

  return <ConsumerType extends (ConsumerType[PropName] extends ProviderType[PropName] ? unknown : never),
      PropName extends (keyof ConsumerType & keyof ProviderType),
      >(vueComponent: ConsumerType,
    fileName: PropName): void => {

    {

      Object.defineProperty(
        vueComponent,
        fileName,
<PropertyDescriptor>Object.getOwnPropertyDescriptor(
  vuexModule,
  fileName
)
      );

    }

  };

}
