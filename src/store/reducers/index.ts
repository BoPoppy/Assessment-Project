import { combineReducers } from 'redux';
import users from './users';
import global from './global';

export const rootReducer = combineReducers({
  users,
  global,
});
