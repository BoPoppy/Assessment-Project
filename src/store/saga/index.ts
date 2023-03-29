import { all } from 'redux-saga/effects';
import { usersSaga } from './users';
import { authenticationSaga } from './authentication';

export const rootSaga = function* root() {
  yield all([usersSaga(), authenticationSaga()]);
};
