import { createRequestType } from './const';
import { createFilterType } from './filter';

export { GLOBAL_COLLAPSED, ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from './global';
export { GET_SCREENING } from './screening';
export { GET_VACCINE } from './vaccine';
export { GET_IPD } from './ipd';
export { GET_DEATH, GET_EXCESS_MORTALITY_DEATH } from './death';
export { GET_HOSPITAL, GET_POPULATION } from './hospital';
export { GET_OTHER_DISEASE } from './other_disease';
export { GET_REINFECTED } from './reinfected';

export const LOGOUT = createRequestType('LOGOUT');
export const LOGIN = createRequestType('LOGIN');
export const GET_USERROLES = createRequestType('GET_USERROLES');
export const GET_USERINFOS = createRequestType('GET_USERINFOS');
export const SET_USERINFOS = createRequestType('SET_USERINFOS');
export const SET_CONSENT = createRequestType('SET_CONSENT');
export const FILTER = createFilterType();
