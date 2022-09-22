import * as React from 'react';
import { connect } from "react-redux";
import { LoginBox } from 'src/components';
import { IState } from "src/reducers/interfaces";
import { AuthApi } from 'src/utils/api';

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
    unlock: async () => await AuthApi.authorize(),
  }),
)(LoginBoxContainer);
