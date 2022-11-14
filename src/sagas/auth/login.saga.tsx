/* eslint-disable @typescript-eslint/no-unused-vars */
import { take, call, fork, put, all } from 'redux-saga/effects';
import { fetchEntity } from '../saga';
import { loginAction, logoutAction, getUserRoles, getUserInfo } from 'src/actions/auth/auth.action';
import { api } from 'src/services';
import * as types from 'src/actions';
import { push } from 'connected-react-router';
import { getToken } from 'src/reducers/selectors';
import { snackbarFailure } from 'src/actions/notification';

const loginEntity = fetchEntity.bind(null, loginAction, api.auth);
const getUserRolesEntity = fetchEntity.bind(null, getUserRoles, api.getUserRoles);
const getUserInfosEntity = fetchEntity.bind(null, getUserInfo, api.getUserInfo);
const logoutEntity = fetchEntity.bind(null, logoutAction, api.logout);

function* watchLoginRequest() {
  while (true) {
    const credential = yield take(types.LOGIN.REQUEST);

    yield call(loginEntity, credential, {
      onFailure: () => {
        return all([put(snackbarFailure('Error: Login Failed'))]);
      },
      onSuccess: (response?: any) => {
        return put(getUserInfo.request(response.userId, response.id));
      },
    });
  }
}

function* watchGetUserRolesRequest() {
  while (true) {
    const credential = yield take(types.GET_USERROLES.REQUEST);
    yield call(getUserRolesEntity, credential, {
      onFailure: () => {
        return all([put(snackbarFailure('Error: User Role Failed'))]);
      },
      onSuccess: () => {
        return put(push('/'));
      },
    });
  }
}

function* watchGetUserInfosRequest() {
  while (true) {
    const credential = yield take(types.GET_USERINFOS.REQUEST);
    yield call(getUserInfosEntity, credential, {
      onFailure: () => {
        return all([put(snackbarFailure('Error: User Info Failed'))]);
      },
      onSuccess: (response?: any) => {
        return put(push('/'));
      },
    });
  }
}

function* watchGetLogoutRequest() {
  while (true) {
    const credential = yield take(types.LOGOUT.REQUEST);

    yield call(logoutEntity, credential, {
      onFailure: () => {
        take(types.LOGOUT.FAILURE);
        all([put(snackbarFailure('Error: Logout Failed'))]);
        return put(push('/'));
      },
      onSuccess: () => {
        api.deleteToken(getToken);
        return put(push('/'));
      },
    });
  }
}

export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchGetUserInfosRequest);
  yield fork(watchGetLogoutRequest);
}
