import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import {
  FETCH_INVOICE_PARAMS_TYPE,
  INVOICE_RESPONSE_TYPE,
} from 'models/invoice';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createNewInvoiceApi, fetchInvoicesApi } from 'services/invoice';
import { updateIsGlobalLoading } from 'store/reducers/global';
import { setInvoicesList } from 'store/reducers/invoices';
import {
  CREATE_NEW_INVOICE_REQUEST,
  FETCH_INVOICES_REQUEST,
} from 'store/reducers/invoices/actionTypes';

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

function* createNewInvoiceRequest(
  action: PayloadAction<{
    data: any;
  }>
) {
  try {
    yield put(updateIsGlobalLoading(true));
    const response: AxiosResponse<INVOICE_RESPONSE_TYPE> = yield call(
      createNewInvoiceApi,
      action.payload.data
    );
    console.log(response);
    yield put(updateIsGlobalLoading(false));
  } catch (error) {
    console.log(error);
    yield put(updateIsGlobalLoading(false));
  }
}

function* invoices() {
  yield takeLatest(FETCH_INVOICES_REQUEST, fetchInvoiceRequest);
  yield takeLatest(CREATE_NEW_INVOICE_REQUEST, createNewInvoiceRequest);
}

export default invoices;
