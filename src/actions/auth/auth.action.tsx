import { action } from '../const';
import * as types from 'src/actions';

export const loginAction = {
  request: (username: string, password: string, ttl: number) =>
    action(types.LOGIN.REQUEST, { email: username, password, ttl }),
  success: (response: any) => action(types.LOGIN.SUCCESS, { data: response }),
  failure: (token: string, error: any) => action(types.LOGIN.FAILURE, { error }),
};

export const getUserRoles = {
  request: (filter: string, token: string) => action(types.GET_USERROLES.REQUEST, { filter, token }),
  success: (response: any) => action(types.GET_USERROLES.SUCCESS, { data: response }),
  failure: (token: string, error: any) => action(types.GET_USERROLES.FAILURE, { error }),
};

export const getUserInfo = {
  request: (userId: string, token: string) => action(types.GET_USERINFOS.REQUEST, { userId, token }),
  success: (response: any) => action(types.GET_USERINFOS.SUCCESS, { data: response }),
  failure: (token: string, error: any) => action(types.GET_USERINFOS.FAILURE, { error }),
};

export const logoutAction = {
  request: (token: string) => action(types.LOGOUT.REQUEST, { token }),
  success: (response: any) => action(types.LOGOUT.SUCCESS, { data: response }),
  failure: (token: string, error: any) => action(types.LOGOUT.FAILURE, { error }),
};

export const setUserConsentAction = {
  request: (payload: any) => action(types.SET_CONSENT.REQUEST, { payload }),
  success: (response: any) => action(types.SET_CONSENT.SUCCESS, { data: response }),
  failure: (token: string, error: any) => action(types.SET_CONSENT.FAILURE, { error }),
};
