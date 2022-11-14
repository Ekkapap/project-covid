import { combineReducers } from 'redux';
import app from './app';
import config from './config';

export default combineReducers({
  app,
  config,
});
