// Webpack global consts
declare const CONSTS: { IS_DEBUG: boolean; GIT_HASH?: string; API_URL: string },

  _IS_DEBUG: boolean = CONSTS.IS_DEBUG,
  _GIT_HASH: string|undefined = CONSTS.GIT_HASH,
  _API_URL: string = CONSTS.API_URL;

export const IS_DEBUG: boolean = _IS_DEBUG;
export const GIT_HASH: string | undefined = _GIT_HASH;
export const API_URL: string = _API_URL;
