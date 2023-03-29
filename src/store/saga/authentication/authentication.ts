import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { ACCESS_TOKEN, ORG_TOKEN } from 'constant/global';
import { LOGIN_BODY_TYPE, LOGIN_RESPONSE_TYPE } from 'models/authentication';
import { ResponseObject } from 'models/global';
import { USER_RESPONSE_TYPE } from 'models/users';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginApi } from 'services/authentication';
import { getUserProfileApi } from 'services/user';
import { LOGIN_REQUEST } from 'store/reducers/authentication/actionTypes';
import { updateIsGlobalLoading } from 'store/reducers/global';

function* loginRequest(action: PayloadAction<LOGIN_BODY_TYPE>) {
  try {
    yield put(updateIsGlobalLoading(true));
    const response: AxiosResponse<LOGIN_RESPONSE_TYPE> = yield call(
      loginApi,
      action.payload
    );
    const user_profile_res: AxiosResponse<USER_RESPONSE_TYPE> = yield call(
      getUserProfileApi,
      response.data.access_token
    );
    localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
    localStorage.setItem(
      ORG_TOKEN,
      user_profile_res.data.data.memberships[0].token
    );
    window.location.reload();
    console.log(user_profile_res);
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
