/**
 *  Hotfix for Edge 15 for reflect data
 */

if (!window.InputEvent) {
  // @ts-ignore: next-line
  window.InputEvent = (): void => {};
}
