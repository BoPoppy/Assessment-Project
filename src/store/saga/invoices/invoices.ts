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
import { setInvoicesList } from 'store/reducers/invoices';
import { FETCH_INVOICES_REQUEST } from 'store/reducers/invoices/actionTypes';

function* fetchInvoiceRequest(
  action: PayloadAction<{ params: FETCH_INVOICE_PARAMS_TYPE }>
) {
  try {
    if (action.payload.params.pageNum === 1)
      yield put(updateIsGlobalLoading(true));
    const response: AxiosResponse<INVOICE_RESPONSE_TYPE> = yield call(
      fetchInvoicesApi,
      action.payload.params
    );
    yield put(setInvoicesList(response.data));
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
