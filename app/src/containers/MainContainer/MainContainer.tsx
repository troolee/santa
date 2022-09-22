import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { WelcomePage } from 'src/pages/Welcome';
import { GarageDoor } from 'src/components';
import { LoginBoxContainer } from 'src/containers';
import { IState } from 'src/reducers/interfaces';
import { PartyContainer } from 'src/containers/PartyContainer';
import { ProfileContainer } from 'src/containers/ProfileContainer';

interface IProps {
  state: IState;
}

const MainContainer: React.SFC<IProps> = props => {
  const renderLoginContainer = () => <LoginBoxContainer />;
  const renderWelcomePage = () => (
    <GarageDoor isLocked={!props.state.auth.isLoggedIn} renderDoor={renderLoginContainer}>
      <Switch>
        <Route path="/me" component={ProfileContainer} />
        <Route>
          <WelcomePage />
        </Route>
      </Switch>
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
