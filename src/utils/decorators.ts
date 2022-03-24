/**
 * Decorates vue method by wrapping it with a function that accepts {resolve, reject} params
 * When decorated function is finished executing resolves or rejects promise callback
 */
function ResolveHandler(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const original = descriptor.value; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  descriptor.value = async function value(
    {resolve, reject}: {resolve(): void; reject(a: unknown): void},
  ): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      await original.apply(this);
    } catch (err: unknown) {
      reject(err);
      return;
    }
    resolve();
  };
}

export {ResolveHandler};
