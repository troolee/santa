import React from 'react';
import { connect } from 'react-redux';
import { IUser } from '../../interfaces';
import { IState, IProfileState } from "src/reducers/interfaces";
import { ProfilePage } from 'src/pages/Profile';
import { signout } from 'src/reducers/auth';
import { fetchParties } from 'src/reducers/profile';

interface IProps {
  user: IUser;
  profile: IProfileState;
  onDidMount: () => void;
  onLogout: () => void;
}

class ProfileContainer extends React.Component<IProps> {
  public componentDidMount() {
    this.props.onDidMount();
  }

  public render () {
    return <ProfilePage {...this.props} />;
  }
};

export default connect(
  (state: IState) => ({
    user: state.auth.user!,
    profile: state.profile,
  }),
  (dispatch: (x: any) => void) => ({
    onDidMount: () => dispatch(fetchParties()),
    onLogout: () => dispatch(signout()),
  })
)(ProfileContainer);
