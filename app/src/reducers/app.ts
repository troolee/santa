import { Action } from "redux";
import { IAppState } from "./interfaces";
import { userSignIn } from "./auth";
import { Api } from "../utils/api";

const initialState: IAppState = {
  isLoaded: false,
  isImagesPreloaded: false,
  apiState: {
    facebookApi: false,
    appApi: false,
  },
}

const APP_LOADED = 'APP_LOADED';
interface IInitalizeAppAction extends Action<'APP_LOADED'> {
  isLoaded: boolean;
}
const appLoaded = (): IInitalizeAppAction => {
  return {
    type: APP_LOADED,
    isLoaded: true,
  };
}

interface IApiReadyAction<T> extends Action<T> {
  isReady: boolean
}

const FACEBOOK_API_READY = 'FACEBOOK_API_READY';
interface IFacebookApiReadyAction extends IApiReadyAction<'FACEBOOK_API_READY'> {}
export const facebookApiReady = (isReady: boolean): IFacebookApiReadyAction => {
  return {
    type: FACEBOOK_API_READY,
    isReady
  }
}

const APP_API_READY = 'APP_API_READY';
interface IAppApiReadyAction extends IApiReadyAction<'APP_API_READY'> {}
export const appApiReady = (isReady: boolean): IAppApiReadyAction => {
  return {
    type: APP_API_READY,
    isReady
  }
}

const APP_IMAGES_PRELOADED = 'APP_IMAGES_PRELOADED';
interface IAppImagesPreloadedAction extends Action<'APP_IMAGES_PRELOADED'> {}
export const appImagesPreloaded = (): IAppImagesPreloadedAction => {
  return {
    type: APP_IMAGES_PRELOADED,
  }
}

export const initializeApp = () => {
  return async (dispatch: any) => {
    const {user} = await Api.fetchInitialAppData();

    if (user !== null) {
      dispatch(userSignIn(user));
    }

    return dispatch(appLoaded());
  }
}

type Actions = (IInitalizeAppAction | IFacebookApiReadyAction | IAppApiReadyAction | IAppImagesPreloadedAction);

export default function auth(state = initialState, action: Actions) {
  switch(action.type) {
    case APP_LOADED:
      return {
        ...state,
        isLoaded: action.isLoaded,
      }
      case FACEBOOK_API_READY:
        return {
          ...state,
          apiState: {
            ...state.apiState,
            facebookApi: action.isReady,
          }
        }
        case APP_API_READY:
          return {
            ...state,
            apiState: {
              ...state.apiState,
              appApi: action.isReady,
            }
          }
        case APP_IMAGES_PRELOADED:
          return {
            ...state,
            isImagesPreloaded: true,
          }
      default:
        return state;
  }
}
