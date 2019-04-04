// webpack global consts
declare const CONSTS: {IS_DEBUG: boolean, GIT_HASH?: string};

const _IS_DEBUG: boolean = CONSTS.IS_DEBUG;
const _GIT_HASH: string|undefined = CONSTS.GIT_HASH;

export const IS_DEBUG = _IS_DEBUG;
export const GIT_HASH = _GIT_HASH;
