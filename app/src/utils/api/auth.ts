import { FacebookApi, Api } from ".";
import store from "../../store";
import { initializeApp } from "../../reducers/app";
import { ToastsContainer } from "../../containers";

export default class AuthApi {
  public static async authorize() {
    const {token} = await FacebookApi.authorize();
    if (token) {
      await Api.init({token});
      await store.dispatch(initializeApp());
      return true;
    } else {
      ToastsContainer.displayToast({
        message: 'Unable to let you in. Please try again later or contact us if error repeats.',
        kind: 'danger',
      });
      return false;
    }
  }
}

