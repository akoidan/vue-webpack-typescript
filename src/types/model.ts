import {User} from "@/types/dto";

export interface RootState {
  users: User[];
}

export interface SessionHolder {
  session: string|null;
}
