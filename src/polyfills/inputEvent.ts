/**
 *  Hotfix for Edge 15 for reflect data
 */
// istanbul ignore next
if (!window.InputEvent) { // eslint-disable-line
  // @ts-ignore: next-line
  window.InputEvent = (): void => {};
}
