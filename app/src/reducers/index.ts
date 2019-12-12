import { combineReducers } from "redux";
import auth from './auth';
import app from './app';
import party from './party';
import profile from './profile';

export default combineReducers({
  app,
  auth,
  party,
  profile,
});
