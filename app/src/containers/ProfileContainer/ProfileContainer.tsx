import React from 'react';
import { connect } from 'react-redux';
import { IUser } from '../../interfaces';
import { IState } from "../../reducers/interfaces";
import { ProfilePage } from '../../pages/Profile';
import { signout } from '../../reducers/auth';

interface IProps {
  user: IUser;
  onLogout: () => void;
}

const ProfileContainer: React.SFC<IProps> = ({user, onLogout}) => {
  return <ProfilePage user={user} onLogout={onLogout} />;
};

export default connect(
  (state: IState) => ({
    user: state.auth.user!,
  }),
  (dispatch: (x: any) => void) => ({
    onLogout: () => dispatch(signout()),
  })
)(ProfileContainer);
