/*
 * Allow only boolean fields be pass to HandleLoading
 */
import {AlertModel} from "@/types/model";
import {Vue} from "vue-property-decorator";
import {getUniqueId} from "@/utils/helpers";
import {globalLogger} from "@/utils/singletons";


type ClassType = new <T extends Vue>(...args: unknown[]) => unknown;
type ValueFilterForKey<T extends InstanceType<ClassType>, U> = {
  [K in keyof T]: U extends T[K] ? K : never;
}[keyof T];


/**
 * Processes all error cases from HandleLoading
 * Sets the state to an error if possible, otherwise rethrows it.
 */
// istanbul ignore next
function processError<T>(
  target: T,
  error: Error|undefined,
  vueProperty: string|unknown,
): void {
  globalLogger.error("Action error {}", error)();
  const text: string = String(error ? error.message : error);
  if (vueProperty) {

    const alert: AlertModel = {
      id: getUniqueId(),
      text,
      type: "error",
    };
    // @ts-ignore: next-line
    target[vueProperty] = alert;
  } else {
    throw Error(text);
  }
}

/**
 * Wraps vue component with `with` block, that wraps the function and does:
 *  - Triggers loading state to true on start, and false on finish
 *  - Sets error message if it occurs
 *
 *  Example:
 *  ```js
 *  class MyComp extends Vue {
 *    public serverError: string = ""; // this would result an error string
 *    public loadingPropName: boolean = false; // this would turn to true on start, and to false on finish
 *
 *    @HandleLoading({errPropName: "serverError", loadingPropName: "loading"})
 *    private async submitForm(): Promise<void> {
 *      // do some action
 *    }
 *  }
 *  ```
 * @param loadingPropName: field of target class that will be assigned to true when this function starts executing
 * @param errPropName: field of target class which would be assined to error if it occurs
 */
function HandleLoading<T extends InstanceType<ClassType>>({loadingPropName, errPropName}: {
  loadingPropName: ValueFilterForKey<T, boolean>;
  errPropName: ValueFilterForKey<T, AlertModel|null>;
}) {
  return function( // eslint-disable-line func-names
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): void {
    const original = descriptor.value;
    descriptor.value = async function(this: T, ...args: unknown[]): Promise<void> { // eslint-disable-line func-names
      try {
        // @ts-ignore: next-line
        // istanbul ignore if
        if (this[loadingPropName]) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
          (this as Vue).$logger.warn("Skipping {} as it's loading", descriptor.value)();
          return;
        }
        // istanbul ignore else
        if (loadingPropName) {
          // @ts-ignore: next-line
          this[loadingPropName] = true;
        }
        await original.apply(this, args);
        // istanbul ignore else
        if (errPropName) {
          // @ts-ignore: next-line
          this[errPropName] = "";
        }
      } catch (err) {
        // istanbul ignore next
        processError<T>(this, err, errPropName);
      } finally {
        // istanbul ignore else
        if (loadingPropName) {
          // @ts-ignore: next-line
          this[loadingPropName] = false;
        }
      }
    };
  };
}

/**
 * Decorates vue method by wrapping it with a function that accepts {resolve, reject} params
 * When decorated function is finished executing resolves or rejects promise callback
 */
function ResolveHandler(target: Vue, propertyKey: string, descriptor: PropertyDescriptor): void {
  const original = descriptor.value;
  descriptor.value = async function value({resolve, reject}: {resolve: Function; reject: Function}): Promise<void> {
    try {
      await original.apply(this);
    } catch (err) {
      reject(err);
      return;
    }
    resolve();
  };
}

export {HandleLoading, ResolveHandler};
