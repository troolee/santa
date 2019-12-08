import { Api } from ".";
import { AuthApiRequest } from "./api";
import store from "../../store";
import { initializeApp } from "../../reducers/app";

type FacebookParams = {
  appId: string;
  autoLogAppEvents?: boolean;
  xfbml?: boolean;
  version?: string;
}

export type AuthResponse = {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
};

type LoginParams = {
  scope?: string;
}

export type LoginStatus = {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse: AuthResponse | null;
};

export type LoginStatusCallback = (status: LoginStatus) => void;

export default class FacebookApi {
  private static params: FacebookParams = {
    appId: "",
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v4.0',
  };
  private static _authResponse: AuthResponse | null = null;
  private static instance: any = null;

  private static getInstance(): Promise<any> {
    return new Promise(complete => {
      if (FacebookApi.instance) {
        complete(FacebookApi.instance);
        return;
      }

      (window as any).fbAsyncInit = () => {
        FacebookApi.instance = (window as any).FB;
        FacebookApi.instance.init(FacebookApi.params);
        complete(FacebookApi.instance);
      };

      ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0] as any;
        if (d.getElementById(id))
          return;
        const js = d.createElement(s) as any;
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });
  }

  public static get authResponse() {
    return FacebookApi._authResponse;
  }

  public static init(params: FacebookParams): Promise<void> {
    return new Promise(async complete => {
      FacebookApi.params = {
        ...FacebookApi.params,
        ...params
      };
      await this.getInstance();
      const {status, authResponse} = await FacebookApi.getLoginStatus(true);
      if (status === 'connected') {
        FacebookApi._authResponse = authResponse!;
      }
      complete();
    });
  }

  public static getLoginStatus(force: boolean = false): Promise<LoginStatus> {
    return new Promise(async complete => {
      (await this.getInstance()).getLoginStatus(complete, force);
    });
  }

  /**
   * Login using Facebook OAuth. This function must be synchronious to prevent content blockers from
   * blocking popups after user clicks Facebook login button.
   * @param cb callback function will be called after login
   */
  public static login(cb: LoginStatusCallback, params?: LoginParams): void {
    FacebookApi.instance.login((res: LoginStatus) => {
      if (res.status === 'connected') {
        FacebookApi._authResponse = res.authResponse!;
      }
      cb(res);
    }, params);
  }

  public static logout(): Promise<any> {
    return new Promise(async complete => {
      const {status} = await FacebookApi.getLoginStatus();
      FacebookApi._authResponse = null;
      if (status === 'connected') {
        FacebookApi.instance.logout(complete);
      }
      else {
        complete();
      }
    });
  }

  public static authorize() {
    return new Promise<{token: string | null}>(complete => {
      const proceedSignIn = async (authRequest: AuthApiRequest) => {
        const {status, token} = await Api.signIn(authRequest);
        if (status === 'ok') {
          await Api.init({token});
          store.dispatch(initializeApp());
          complete({token});
        } else {
          complete({token: null});
        }
      };

      const cancelSignIn = () => complete({token: null});

      if (FacebookApi.authResponse) {
        proceedSignIn(FacebookApi.authResponse);
      } else {
        FacebookApi.login(({status, authResponse}) => {
          if (status === 'connected') {
            proceedSignIn(authResponse!);
          } else {
            cancelSignIn();
          }
        }, {scope: 'public_profile,email'});
      }
    });
  }
}
