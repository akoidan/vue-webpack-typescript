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

export {ResolveHandler}
