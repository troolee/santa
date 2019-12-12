import { IUser, IParty } from "../interfaces";

export type IApiState = {
  readonly facebookApi: boolean;
  readonly appApi: boolean;
};

export interface IAppState {
  readonly isLoaded: boolean;
  readonly isImagesPreloaded: boolean;
  readonly apiState: IApiState;
}

export interface IAuthState {
  readonly isLoggedIn: boolean;
  readonly isAuthBusy: boolean;
  readonly user: IUser | null;
}

export interface IPartyState {
  readonly isLoading: boolean;
  readonly current: IParty | null;
}

export interface IProfileState {
  readonly parties: IParty[] | null;
}

export interface IState {
  readonly app: IAppState;
  readonly auth: IAuthState;
  readonly party: IPartyState;
  readonly profile: IProfileState;
}
