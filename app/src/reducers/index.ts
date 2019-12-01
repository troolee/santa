import { combineReducers } from "redux";
import auth from './auth';
import app from './app';


const theApp = combineReducers({
  app,
  auth,
});

export default theApp;
