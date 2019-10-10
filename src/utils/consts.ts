// webpack global consts
declare const CONSTS: { IS_DEBUG: boolean; GIT_HASH?: string; API_URL: string };

const _IS_DEBUG: boolean = CONSTS.IS_DEBUG;
const _GIT_HASH: string|undefined = CONSTS.GIT_HASH;
const _API_URL: string = CONSTS.API_URL;

export const IS_DEBUG: boolean = _IS_DEBUG;
export const GIT_HASH: string | undefined = _GIT_HASH;
export const API_URL: string = _API_URL;
