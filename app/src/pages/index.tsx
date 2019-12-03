import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { WelcomePage } from './Welcome';

export const IndexPage: React.SFC = () => (
  <>
    <Switch>
      <Route path="/" component={WelcomePage} />
    </Switch>
  </>
);
