import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import app from "./reducers";
import { IState } from "./reducers/interfaces";

const store = createStore(
  app,
  composeWithDevTools(
    applyMiddleware(
      thunk as ThunkMiddleware<IState, any>,
    )
  ),
);

export default store;
