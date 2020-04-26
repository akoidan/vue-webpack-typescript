async function sleep(ms: number): Promise<void> {
  return new Promise((resolve: () => void) => setTimeout(resolve, ms));
}

const getUniqueId = ((): () => number => {
  let id = 1;
  return (): number => id++;
})();

export {sleep, getUniqueId};
