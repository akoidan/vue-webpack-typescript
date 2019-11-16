// Webpack global consts
declare const CONSTS: { IS_DEBUG: boolean; GIT_HASH?: string; API_URL: string };

export const {
  GIT_HASH,
  API_URL,
  IS_DEBUG,
} = CONSTS;

