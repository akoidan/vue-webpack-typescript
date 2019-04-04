import {SessionHolder} from '@/types/model';

export class SessionHolderImpl {
  set session(value: string|null) {
    if (value) {
      localStorage.setItem('session_id', value);
    } else {
      localStorage.removeItem('session_id');
    }
  }
  get session(): string|null {
    return localStorage.getItem('session_id');
  }
}
