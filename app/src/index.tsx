import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import App from './App';
import store from './store';
import { facebookApiReady, appApiReady } from './reducers/app';
import { FacebookApi, Api } from './utils/api';
import { ToastsContainer } from './containers';
import { MessageBoxProvider } from './containers/MessageBox';
import * as MiscPages from './pages/Misc';
import { ScrollToTop } from './components';
import history from './utils/history';

import './index.css';

FacebookApi.init({
  appId: process.env.REACT_APP_FACEBOOK_APP_ID!,
}).then(() => {
  store.dispatch(facebookApiReady(true));
});

Api.init({}).then(() => {
  store.dispatch(appApiReady(true));
});

ReactDOM.render(
  (
    <Provider store={store}>
      <MessageBoxProvider>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            <Route path="/privacy" component={MiscPages.PrivacyPage} />
            <Route path="/terms" component={MiscPages.TermsPage} />

            <Route path="/" component={App} />
          </Switch>
        </Router>
      </MessageBoxProvider>
      <ToastsContainer />
    </Provider>
  ),
  document.getElementById('root')
);
