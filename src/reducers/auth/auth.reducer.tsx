import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { AuthState } from 'src/types/auth';
import moment from 'moment';

const initialState: AuthState = {
  authPending: false,
  loggedInSuccess: false, // succesful load user setting
  loginError: false,
  errorMessage: null,
  authority: ['guest'],
  authToken: null,
  refreshToken: null,
  tokenExpire: null,
  switchUser: false,
  permissions: { Role: {} },
};

export function auth(state = initialState, action: AnyAction): AuthState {
  switch (action.type) {
    case types.LOGIN.REQUEST:
      return {
        ...state,
        authority: ['guest'],
        authPending: true,
        loginError: false,
        errorMessage: null,
        switchUser: false,
      };

    case types.LOGIN.SUCCESS:
      return {
        ...state,
        authPending: false,
        authority: ['user'],
        loggedInSuccess: true,
        loginError: false,
        authToken: action.data.id,
        refreshToken: action.data.id,
        tokenExpire: moment(action.data.created)
          .add(action.data.ttl / 60, 'minute')
          .format('YYYY-MM-DD HH:mm:ss'),
        switchUser: true,
      };

    case types.GET_USERROLES.SUCCESS:
      return {
        ...state,
        permissions: action.data,
      };
    case types.GET_USERINFOS.SUCCESS: {
      let authority = '';

      switch (action.data.RoleMapping.Role['name']) {
        case 'AdminR8':
          authority = 'admin';
          break;
        case 'AdminChangwat':
          authority = 'admin';
          break;
        case 'AdminHospital':
          authority = 'admin';
          break;
        default:
          authority = 'user';
      }

      return {
        ...state,
        authority: [authority],
        permissions: action.data.RoleMapping,
      };
    }

    case types.LOGIN.FAILURE: {
      return {
        ...state,
        authPending: false,
        authority: ['guest'],
        loggedInSuccess: false,
        loginError: true,
        errorMessage: action.error && action.error.error ? action.error.error.message : 'เข้าใช้งานระบบไม่สำเร็จ',
      };
    }

    case types.LOGOUT.SUCCESS:
      return initialState;

    case types.LOGOUT.FAILURE:
      return initialState;

    default:
      return state;
  }
}
