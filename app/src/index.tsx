import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import App from 'src/App';
import store from 'src/store';
import { facebookApiReady, appApiReady } from 'src/reducers/app';
import { FacebookApi, Api } from 'src/utils/api';
import { ToastsContainer } from 'src/containers';
import { MessageBoxProvider } from 'src/containers/MessageBox';
import * as MiscPages from 'src/pages/Misc';
import { ScrollToTop } from 'src/components';
import history from 'src/utils/history';

import 'src/index.css';

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
