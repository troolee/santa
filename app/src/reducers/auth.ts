import { Action } from "redux";
import { IAuthState } from "./interfaces";
import { IUser } from "../interfaces";

const initialState: IAuthState = {
  isLoggedIn: false,
  isAuthBusy: false,
  user: null,
}

const USER_SIGNIN = 'USER_SIGNIN';
interface IUserSignInAction extends Action<'USER_SIGNIN'> {
  user: IUser,
}
export const userSignIn = (user: IUser) => {
  return {
    type: USER_SIGNIN,
    user,
  }
}

const USER_SIGNOUT = 'USER_SIGNOUT';
interface IUserSignOutAction extends Action<'USER_SIGNOUT'> {
}
export function userSignOut() {
  return {
    type: USER_SIGNOUT,
  }
}

const AUTH_BUSY = 'AUTH_BUSY';
interface IAuthBusyAction extends Action<'AUTH_BUSY'> {
  value: boolean,
}
export const authBusy = (value: boolean) => {
  return {
    type: AUTH_BUSY,
    value
  }
}

type AuthActions = (
  IUserSignInAction | IUserSignOutAction | IAuthBusyAction
)

export default function auth(state = initialState, action: AuthActions) {
  switch(action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        isLoggedIn: action.user !== null,
        user: action.user,
      }
    case USER_SIGNOUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    case AUTH_BUSY:
      return {
        ...state,
        isAuthBusy: action.value,
      }
    default:
      return state;
  }
}
