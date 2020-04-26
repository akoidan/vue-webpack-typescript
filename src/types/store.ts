import {AlertModel, Branch} from "@/types/model";

interface IGithubState {
  branches: Branch[]|null;
}

interface IAlertsState {
  alerts: AlertModel[];
}

interface IRootState {
  github: IGithubState;
  alerts: IAlertsState;
}

export {IGithubState, IAlertsState, IRootState};
