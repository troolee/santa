import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';
import App from './App';
import store from './store';
import { facebookApiReady, appApiReady } from './reducers/app';
import { FacebookApi, Api } from './utils/api';
import { ToastsContainer } from './containers';
import { MessageBoxProvider } from './containers/MessageBox';

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
          <App />
        </Router>
      </MessageBoxProvider>
      <ToastsContainer />
    </Provider>
  ),
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
