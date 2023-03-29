import { all } from 'redux-saga/effects';
import users from './users';

export const usersSaga = function* root() {
  yield all([users()]);
};
