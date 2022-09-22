import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import app from "src/reducers";
import { IState } from "src/reducers/interfaces";

const store = createStore(
  app,
  composeWithDevTools(
    applyMiddleware(
      thunk as ThunkMiddleware<IState, any>,
    )
  ),
);

export default store;
