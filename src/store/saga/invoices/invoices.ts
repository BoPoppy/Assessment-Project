import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import {
  FETCH_INVOICE_PARAMS_TYPE,
  INVOICE_RESPONSE_TYPE,
} from 'models/invoice';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchInvoicesApi } from 'services/invoice';
import { updateIsGlobalLoading } from 'store/reducers/global';
import { FETCH_INVOICES_REQUEST } from 'store/reducers/invoices/actionTypes';
import { updateUserProfile } from 'store/reducers/users';
import { GET_USERS_PROFILE_REQUEST } from 'store/reducers/users/actionTypes';

function* fetchInvoiceRequest(
  action: PayloadAction<FETCH_INVOICE_PARAMS_TYPE>
) {
  try {
    yield put(updateIsGlobalLoading(true));
    const response: AxiosResponse<INVOICE_RESPONSE_TYPE> = yield call(
      fetchInvoicesApi,
      action.payload
    );
    console.log(response);
    yield put(updateIsGlobalLoading(false));
  } catch (error) {
    console.log(error);
    yield put(updateIsGlobalLoading(false));
  }
}

function* users() {
  yield takeLatest(FETCH_INVOICES_REQUEST, fetchInvoiceRequest);
}

export default users;
