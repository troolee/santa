import * as React from 'react';
import { connect } from "react-redux";
import { ToastsContainer } from '.';
import { LoginBox } from '../components';
import { initializeApp } from '../reducers/app';
import { IState } from "../reducers/interfaces";
import { Api, FacebookApi } from '../utils/api';
import { AuthApiRequest } from '../utils/api/api';
import store from '../store';

const LoginBoxContainer: React.FC<{
  isFacebookApiReady: boolean,
  unlock: () => Promise<any>,
}> = ({unlock, isFacebookApiReady}) => (
  <LoginBox onLoginClick={unlock} isFacebookApiReady={isFacebookApiReady} />
);

export default connect(
  (state: IState) => ({
    isFacebookApiReady: state.app.apiState.facebookApi,
  }),
  dispatch => ({
    unlock: () => new Promise(complete => {
      const proceedSignIn = async (authRequest: AuthApiRequest) => {
        const {status, token} = await Api.signIn(authRequest);
        if (status === 'ok') {
          await Api.init({token});
          store.dispatch(initializeApp());
        } else {
          ToastsContainer.displayToast({
            message: 'Unable to let you in. Please try again later or contact us if error repeats.',
            kind: 'danger',
          });
        }
        complete();
      };

      const cancelSignIn = complete;

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
    }),
  }),
)(LoginBoxContainer);
