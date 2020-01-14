/**
 *  Hotfix for Edge 15 for reflect data
 */
// eslint-disable
// istanbul ignore next
if (!window.InputEvent) {
  // @ts-ignore: next-line
  window.InputEvent = (): void => {};
}
