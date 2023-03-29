import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { LOGIN_RESPONSE_TYPE } from 'models/authentication';
import { ResponseObject } from 'models/global';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginApi } from 'services/authentication';
import { LOGIN_REQUEST } from 'store/reducers/authentication/actionTypes';
import { updateIsGlobalLoading } from 'store/reducers/global';

function* loginRequest(action: PayloadAction<any>) {
  try {
    yield put(updateIsGlobalLoading(true));
    const response: AxiosResponse<ResponseObject<LOGIN_RESPONSE_TYPE>> =
      yield call(loginApi, action.payload);
    console.log(response);
    yield put(updateIsGlobalLoading(false));
  } catch (error) {
    console.log(error);
    yield put(updateIsGlobalLoading(false));
  }
}

function* authentication() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
}

export default authentication;
