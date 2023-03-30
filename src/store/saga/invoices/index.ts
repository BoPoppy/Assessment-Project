import { all } from 'redux-saga/effects';
import invoices from './invoices';

export const invoicesSaga = function* root() {
  yield all([invoices()]);
};
