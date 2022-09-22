import { combineReducers } from "redux";
import auth from 'src/reducers/auth';
import app from 'src/reducers/app';
import party from 'src/reducers/party';
import profile from 'src/reducers/profile';

export default combineReducers({
  app,
  auth,
  party,
  profile,
});
