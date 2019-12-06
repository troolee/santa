import * as React from 'react';
import { connect } from 'react-redux';
import { WelcomePage } from '../../pages/Welcome';
import { GarageDoor } from '../../components';
import { LoginBoxContainer } from '..';
import { IState } from '../../reducers/interfaces';

import './MainContainer.css';

interface IProps {
  state: IState;
}

const MainContainer: React.SFC<IProps> = props => {
  const renderLoginContainer = () => <LoginBoxContainer />;

  return (
    <GarageDoor isLocked={!props.state.auth.isLoggedIn} renderDoor={renderLoginContainer}>
      <WelcomePage />
    </GarageDoor>
  );
};

export default connect(
)(MainContainer);
