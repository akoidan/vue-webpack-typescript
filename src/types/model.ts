interface User {
  id: number;
}

type AlertType = "success" | "info" | "error";

interface AlertModel {
  id: number;
  text: string;
  type: AlertType;
}

interface Consts {
  IS_DEBUG: boolean;
  APP_VERSION?: string;
  API_URL: string;
  HELP_URL: string;
  ROUTER_HISTORY_MODE: "hash" | "history";
  DISPLAY_ALERTS_MS: number;
  MAX_ERROR_NUMBER: number;
}
interface RequestOptions<T> {
  url: string;
  method: "GET" | "POST";
  body?: T|null;
  authToken?: string|null;
  parseResponseAsJson?: boolean;
}

export {
  AlertModel,
  AlertType,
  Consts,
  RequestOptions,
  User,
};
