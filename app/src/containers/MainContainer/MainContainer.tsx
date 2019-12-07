import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { WelcomePage } from '../../pages/Welcome';
import { GarageDoor } from '../../components';
import { LoginBoxContainer } from '..';
import { IState } from '../../reducers/interfaces';

import './MainContainer.css';
import { PartyContainer } from '../PartyContainer';

interface IProps {
  state: IState;
}

const MainContainer: React.SFC<IProps> = props => {
  const renderLoginContainer = () => <LoginBoxContainer />;
  const renderWelcomePage = () => (
    <GarageDoor isLocked={!props.state.auth.isLoggedIn} renderDoor={renderLoginContainer}>
      <WelcomePage />
    </GarageDoor>
  );

  return (
    <Switch>
      <Route path="/p/(new|join)" exact={true}>
        {renderWelcomePage()}
      </Route>
      <Route path="/p/:party" component={PartyContainer} />
      <Route>
        {renderWelcomePage()}
      </Route>
    </Switch>
  );
};

export default connect(
)(MainContainer);
