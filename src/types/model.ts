import {User} from "@/types/dto";

interface RootState {
  users: User[];
}

interface SessionHolder {
  session: string|null;
}

export {RootState, SessionHolder};
