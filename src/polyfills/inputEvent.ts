/**
 *  Hotfix for Edge 15 for reflect data
 */

if (!window.InputEvent) { // eslint-disable-line
  // @ts-ignore: next-line
  window.InputEvent = (): void => {};
}
