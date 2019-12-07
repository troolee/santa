import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers/interfaces';
import { PartyComponent, AppLoading } from '../../components';
import { fetchParty } from '../../reducers/party';
import { IParty, IUser } from '../../interfaces';
import { signout } from '../../reducers/auth';

interface IProps {
  party: IParty | null;
  user: IUser | null;
  isLoading: boolean;
  match: any;
  onRequestParty: (code: string) => void;
  onJoinClick: () => Promise<any>;
  onLogout: () => void;
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
      : <PartyComponent party={this.props.party} user={this.props.user} onLogout={this.props.onLogout} onJoinClick={this.props.onJoinClick} />;
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
    onJoinClick: () => {
      return new Promise(done => {
        setTimeout(done, 3000);
      });
    },
  })
)(PartyContainer);
