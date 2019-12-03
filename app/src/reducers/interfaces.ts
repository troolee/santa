import { IUser } from "../interfaces";

export type IApiState = {
  readonly facebookApi: boolean;
  readonly appApi: boolean;
};

export interface IAppState {
  readonly isLoaded: boolean;
  readonly apiState: IApiState;
}

export interface IAuthState {
  readonly isLoggedIn: boolean;
  readonly isAuthBusy: boolean;
  readonly user: IUser | null;
}

export interface IState {
  readonly app: IAppState;
  readonly auth: IAuthState;
}
