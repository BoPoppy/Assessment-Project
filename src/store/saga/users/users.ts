import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { updateIsGlobalLoading } from 'store/reducers/global';
import { updateUserProfile } from 'store/reducers/users';
import { GET_USERS_PROFILE_REQUEST } from 'store/reducers/users/actionTypes';

function* getUserDetailRequest() {
  try {
    yield put(updateIsGlobalLoading(true));
    // const response: AxiosResponse<ResponseObject<USER_DETAIL_RESPONSE_TYPE>> =
    //   yield call(getUserDetailApi, action.payload.id);
    yield put(updateUserProfile(null));
    yield put(updateIsGlobalLoading(false));
  } catch (error) {
    console.log(error);
    yield put(updateIsGlobalLoading(false));
  }
}

function* users() {
  yield takeLatest(GET_USERS_PROFILE_REQUEST, getUserDetailRequest);
}

export default users;
