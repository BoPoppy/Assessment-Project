import { all } from 'redux-saga/effects';
import authentication from './authentication';

export const authenticationSaga = function* root() {
  yield all([authentication()]);
};
