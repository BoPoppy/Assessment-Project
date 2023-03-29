import { all } from 'redux-saga/effects';
import { usersSaga } from './users';

export const rootSaga = function* root() {
  yield all([usersSaga()]);
};
