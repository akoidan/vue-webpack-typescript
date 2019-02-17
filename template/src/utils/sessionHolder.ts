import {SessionHolder} from '../types/model';

export default class SessionHolderImpl {
  set session(value: string) {
      localStorage.setItem('session_id', value);
  }
  get session(): string {
   return localStorage.getItem('session_id');
  }

}
