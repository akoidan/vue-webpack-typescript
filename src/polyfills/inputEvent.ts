/**
 *  Hotfix for Edge 15 for reflect data
 */

if (!window.InputEvent) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
  // @ts-ignore: next-line
  window.InputEvent = (): void => {};
}
