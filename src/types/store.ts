import {AlertModel, User} from "@/types/model";

interface IUserState {
  users: User[];
}

interface IAlertsState {
  alerts: AlertModel[];
}

interface IRootState {
  users: IUserState;
  alerts: IAlertsState;
}

export {IUserState, IAlertsState, IRootState};
