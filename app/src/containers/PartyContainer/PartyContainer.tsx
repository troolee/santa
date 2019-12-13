import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers/interfaces';
import { PartyComponent, AppLoading } from '../../components';
import { fetchParty, joinParty, leaveParty, closeParty } from '../../reducers/party';
import { IParty, IUser } from '../../interfaces';
import { signout } from '../../reducers/auth';
import { AuthApi, Api } from '../../utils/api';
import AskPassword from './AskPassword';
import ConfirmLeaving from './ConfirmLeaving';
import ConfirmClosing from './ConfirmClosing';

interface IProps {
  party: IParty | null;
  user: IUser | null;
  isLoading: boolean;
  match: any;
  onRequestParty: (code: string) => void;
  onJoinClick: (user: IUser | null, party: IParty) => Promise<any>;
  onLogout: () => void;
  onLeave: (party: IParty) => Promise<any>;
  onFinish: (party: IParty) => Promise<any>;
}

class PartyContainer extends React.Component<IProps> {
  public componentDidMount() {
    if (this.props.party === null) {
      this.props.onRequestParty(this.props.match.params.party);
    }
  }

  public render () {
    return this.props.isLoading
      ? <AppLoading />
      : <PartyComponent
          party={this.props.party}
          user={this.props.user}
          onLogout={this.props.onLogout}
          onJoinClick={this.props.onJoinClick}
          onLeave={this.props.onLeave}
          onFinish={this.props.onFinish}
      />;
  }
}

export default connect(
  (state: IState) => ({
    party: state.party.current,
    isLoading: state.party.isLoading,
    user: state.auth.user,
  }),
  (dispatch: (x: any) => void) => ({
    onRequestParty: (code: string) => dispatch(fetchParty(code)),
    onLogout: async () => {
      await dispatch(signout());
      window.location.reload();
    },
    onJoinClick: async (user: IUser | null, party: IParty) => {
      if (user === null) {
        if (!await AuthApi.authorize()) {
          return;
        }
        party = (await Api.fetchParty(party.code))!;
      }
      let password = null;
      if (party.isProtected && !party.isJoined) {
        const passwordInput = await AskPassword.showMessageBox() as {password: string} | null | undefined;
        if (!passwordInput) {
          return;
        }
        password = passwordInput.password;
      }
      dispatch(joinParty(party, password));
    },
    onLeave: async (party: IParty) => {
      if (await ConfirmLeaving.showMessageBox()) {
        dispatch(leaveParty(party));
      }
    },
    onFinish: async (party: IParty) => {
      if (await ConfirmClosing.showMessageBox()) {
        dispatch(closeParty(party));
      }
    },
  })
)(PartyContainer);
