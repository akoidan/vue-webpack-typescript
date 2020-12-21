// Webpack global consts
import type {Consts} from "@/types/model";

declare const CONSTS: Consts;

// Unpack webpack define plugin values here from json
const {
  // CVS short revision
  APP_VERSION,
  // Base http url of the backend
  API_URL,
  // True will result a debug build. Loggers would logs all, global scope would have debug variables, etc
  IS_DEBUG,
  // True if `/home` style pages would be used instead of `/#home`
  ROUTER_HISTORY_MODE,
} = CONSTS;

export const ApiConsts: Consts = {
  /* eslint-disable @typescript-eslint/naming-convention */
  API_URL,
  APP_VERSION,
  DISPLAY_ALERTS_MS: 30000,
  HELP_URL: "https://github.com/akoidan/vue-webpack-typescript",
  IS_DEBUG,
  MAX_ERROR_NUMBER: 3,
  ROUTER_HISTORY_MODE,
  /* eslint-enable @typescript-eslint/naming-convention */
};
