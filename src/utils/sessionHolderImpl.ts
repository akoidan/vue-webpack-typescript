import {SessionHolder} from "@/types/model";

/**
 * Permanent storage for session
 */
export class SessionHolderImpl implements SessionHolder {
  public set session(value: string | null) { // eslint-disable-line class-methods-use-this
    if (value) {
      localStorage.setItem(
        "session_id",
        value,
      );
    } else {
      localStorage.removeItem("session_id");
    }
  }

  public get session(): string|null { // eslint-disable-line class-methods-use-this
    return localStorage.getItem("session_id");
  }
}
