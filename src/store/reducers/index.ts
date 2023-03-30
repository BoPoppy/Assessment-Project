import { combineReducers } from 'redux';
import users from './users';
import global from './global';
import invoices from './invoices';

export const rootReducer = combineReducers({
  users,
  global,
  invoices,
});
